from course import Course
from student import Student
from iaf import IAF
from insights import insights
from validation import validation
import yaml
from collections import defaultdict
import pandas as pd
from copy import deepcopy
from tqdm import tqdm

###################################################################################################
# reading config file for fetching paths
paths = open("../config.yaml", 'r')
paths_dictionary = yaml.load(paths)

'''
INPUT FILES
'''
STUDENTS_LIST = paths_dictionary["STUDENTS_LIST"]
# path to the file containing the students roll numbers

STUDENT_COURSES = paths_dictionary["STUDENT_COURSES"]
# path to the file containing the course data taken by students

STUDENT_FORM_DATA = paths_dictionary["STUDENT_FORM_DATA"]
# path to the file containing the students data

COURSE_DATA = paths_dictionary["COURSE_DATA"]
# path to the file containing the courses data


'''
OUTPUT FILES
'''
STUDENT_ALLOCATION = paths_dictionary["STUDENT_ALLOCATION"]
# path where final allocation is stored student wise

COURSE_ALLOCATION = paths_dictionary["COURSE_ALLOCATION"]
# path where final allocation is stored course wise

'''
Parameters
'''
NUM_ITERATIONS = paths_dictionary["NUM_ITERATIONS"]
# Number of times the allocation algorithm is executed. The final output is the allocation that gave
# highest number of total allocations.
####################################################################################################

'''
HELPER FUCNTIONS
'''
# Hamming distance func to ignore at max 1 character error made by students while filling unique code


def ham_dist(s1, s2):
    dis = 0
    for i in range(len(s1)):
        if s1[i] != s2[i]:
            dis += 1
    if dis <= 1:
        return 1
    return 0

# To take input, validate data and store the data as lists of course and student objects.


def get_input():
    student_list = pd.read_excel(STUDENTS_LIST).dropna()
    student_list['Roll No'] = student_list['Roll No'].astype(int)
    # dataframe of student unique codes
    student_course_list = pd.read_excel(STUDENT_COURSES).dropna()

    student_vs_course_taken = {i["Roll No"]: list(student_course_list[student_course_list["Roll No"] == i["Roll No"]]["PreCourseNo"].values)
                               for ind, i in student_list.iterrows()}

    # dictionary<student roll : list of [code filled by student, actual code shared]>
    cours = pd.read_excel(COURSE_DATA).fillna("")
    # dataframe of course data
    courses = [Course(i["Course Code"].strip(), i["Course Title"].strip(), int(i["Cap"]), [ts.strip() for ts in i["Time Slot Lecture"].split(
        ", ") if ts != ''], [ts for ts in i["Time Slot Tutorial"].split(", ") if ts != '']) for ind, i in cours.iterrows()]
    # list of course objects

    studs = pd.read_excel(STUDENT_FORM_DATA)
    studs['Roll Number'] = studs['Roll Number'].fillna(0).astype(int)
    # dataframe of students data
    students_data = {}
    # helper dictionary to construct list of student objects

    # iterating over students df to take input into list of student objects after validation
    for ind, i in studs.iterrows():

        # if the roll number recieved through form is not present in the students list whoever received the unique codes or if he/she is a first year student
        if (i["Roll Number"] not in student_vs_course_taken) or str(int(i["Roll Number"]))[:4] == "2011":
            continue

        # fetch the latest input recieved from each student based on time stamp and construct student objects to store in a list
        if (((i["Roll Number"] in students_data) and (students_data[i["Roll Number"]]["Timestamp"] < i["Timestamp"])) or (i["Roll Number"] not in students_data)):
            students_data[i["Roll Number"]] = {
                "Timestamp": i["Timestamp"],
                "Programme": i["Programme"],
                "Roll Number": int(i["Roll Number"]),
                "Name": i["Name"],
                "Number of courses to register": min([int(i["Number of courses to register"]), int(i["Number of Preferences"]), 2]),
                "Number of Preferences": int(i["Number of Preferences"]),
                "Courses": [i["Preference #"+str(j+1)].strip() for j in range(int(i["Number of Preferences"]))],
                "Alloted": student_vs_course_taken[i["Roll Number"]]
            }

    students = [
        Student(roll_num=students_data[i]["Roll Number"],
                name=students_data[i]["Name"],
                programme=students_data[i]["Programme"],
                req=min(students_data[i]["Number of courses to register"] +
                        len(students_data[i]["Alloted"]), 2),
                num_pref=students_data[i]["Number of Preferences"],
                pref_list=students_data[i]["Courses"],
                alloc=students_data[i]["Alloted"])
        for i in students_data]
    # construct list of student objects by using the students_data dictionary

    # print("Invaid Inputs:",invalid_inputs)
    # print(invalid_inputs_map)
    print("Input Done!\n")

    # Section for adding courses added in pre-registration to the students

    return courses, students

# to write the final allocation data into files


def write_output(courses, students):
    max_req = max([s.req for s in students])
    df1 = pd.DataFrame([[s.roll, s.name]+s.alloc+['' for _ in range(max_req-len(s.alloc))] for s in students],
                       columns=["Student Roll Number", "Student Name"]+["Allocated Course "+str(i+1) for i in range(max_req)])
    df2 = pd.DataFrame([[c.code, c.name, c.cap, ", ".join([str(roll) for roll in c.students])]
                        for c in courses], columns=["Course Code", "Course Name", "Course Cap", "Allocated Students"])
    df1.to_excel(STUDENT_ALLOCATION)
    df2.to_excel(COURSE_ALLOCATION)


'''
MAIN CODE
'''


def main():
    best = -1
    # maximum of the number of allocations recieved over iterations
    bstc, bsts = [], []
    # course and student allocations corresponding to the best allocation
    courses, students = get_input()
    # taking input using helper function

    # NUM_ITERATIONS = 10
    # iterating multiple times to get a better allocation rather than running the algo once and allocating
    for _ in tqdm(range(NUM_ITERATIONS)):
        cs, ss = deepcopy(courses), deepcopy(students)
        solver = IAF(cs, ss)
        solver.run()
        # run the allocation algo

        # compare best allocation till now and update
        if solver.total_allocations > best:
            best = solver.total_allocations
            bstc, bsts = cs, ss

    # write allocation output into files using the helper function
    write_output(bstc, bsts)

    # insights of the best allocation
    insights(bstc, bsts)

    # Stats of allocation
    print("Total availability of courses", sum(c.cap for c in courses))
    print("Total Number of Required Allocations:",
          sum([s.req for s in students]))
    print("Total Number of Allocations:", best)

    # Testing the allocation to avoid mishaps
    validation(bstc, bsts)


if __name__ == '__main__':
    main()
