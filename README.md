# IIT Gandhinagar - HSS Course Allotment Tool
Welcome to the HSS Course Allotment Tool. 

### Requirements
This tool requires Python3. Run the following command to get all the required libraries.
<pre>
pip install -r requirements.txt
</pre>

This tool involves two major components, which are required to be executed in the following order:
- Student Preferences Input Form
- Allocation

## Student Preferences Input Form
Folder: `/form`

This component deals with the UI and Backend of the form used to collect student preferences.
### User Interface
- To make changes to the User Interface, make changes in `index.html`. CSS and JS files and images can be found in the folder `assets`.
- The file `index_done.html` can be used when the form is closed.

### Form Validation
The form validation can be found in `index.js`. Go through this file to understand how the validations work. *Also, to add courses as options in the dropdown, you have to add the courses data to `index.js` as a `json` object. You can use [this](https://beautifytools.com/excel-to-json-converter.php) tool for this purpose.*

### Collecting Form Responses
We used Google App Script for this purpose. 
- Create a spreadsheet on Google Sheets.
- Go to `Tools`, then `Script Editor`
- Copy the code present in `form/code.gs` and paste it in the script editor.
- In the toolbar, select the function `setup` and click `Run`.
- Select `Deploy`, then `New Deployment`. Under `Web app`, choose `Me` option under `Execute as`, and `Anyone` under `Who has access`. Then, Deploy.
- Copy the URL of the Web app and paste it in `index.js` (at the variable `scriptURL`).

Once you complete the above steps, the responses from the form are stored in the Google Sheets.

## Final Allocation
Folder: `/code`

The final component is the Course Allocation. This step is to be executed after receiving the final responses from students. The details of the algorithm used for student-course allocation is described [here](https://docs.google.com/document/d/1MDDga0pknnDucc_b_L-6TgLIVnN_6qPMclboX-JUq8Y/edit?usp=sharing).

To run the allocation code, below are the requirements.

### Instructions to run the code
- Edit `config.yaml` to provide paths of the input and output files or just replace the files in courses_data, students_data folders and output files will be generated in output folder.
- On the Terminal, run the following command
<pre>
python main.py
</pre>
- The Output allocation is stored at the Output file path specified in `config.yaml`.
- Insights, if required, can also be modified as per requirement. The output folder path must be specified in `config.yaml`.
