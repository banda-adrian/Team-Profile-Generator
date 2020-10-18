const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function getTeam() {
    const addEmployee = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'newEmployeePrompt',
                message: 'Do you want to add a new Employee?',
                choices: [
                    'Yes', 
                    'No'
                ]
            }
        ])
            .then(async answer => {
                if (answer.newEmployeePrompt === 'Yes') {
                    await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employeeRole',
                            message: 'What is the employees role?',
                            choices:
                                [
                                    'Manager', 
                                    'Engineer', 
                                    'Intern'
                                ]
                        }
                    ])
                        .then(async answer => {
                            if (answer.employeeRole === 'Manager') {
                                await inquirer.prompt([
                                    {
                                        type: 'input',
                                        name: 'managerName',
                                        message: 'What is the Managers name?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'managerId',
                                        message: 'What is the Managers ID?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'managerEmail',
                                        message: 'What is the Managers email address?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'managerOfficeNumber',
                                        message: 'What is the Managers Office number?'
                                    }
                                ])
                                    .then(answers => {
                                        const manager = new Manager(
                                            answers.managerName,
                                            answers.managerId,
                                            answers.managerEmail,
                                            answers.managerOfficeNumber,
                                        );
                                        employees.push(manager);
                                        addEmployee();
                                    })
                            }
                            else if (answer.employeeRole === 'Engineer') {
                                await inquirer.prompt([
                                    {
                                        type: 'input',
                                        name: 'engineerName',
                                        message: 'What is the Engineers name?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'engineerId',
                                        message: 'What is the Engineers ID?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'engineerEmail',
                                        message: 'What is the Engineers email address?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'engineerGithub',
                                        message: 'What is the Engineers Github username?'
                                    }
                                ])
                                    .then(answers => {
                                        const engineer = new Engineer(
                                            answers.engineerName,
                                            answers.engineerId,
                                            answers.engineerEmail,
                                            answers.engineerGithub,
                                        );
                                        employees.push(engineer);
                                        addEmployee();
                                    })
                            }
                            else if (answer.employeeRole === 'Intern') {
                                await inquirer.prompt([
                                    {
                                        type: 'input',
                                        name: 'internName',
                                        message: 'What is the Interns name?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'internId',
                                        message: 'What is the Interns ID?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'internEmail',
                                        message: 'What is the Interns email address?'
                                    },
                                    {
                                        type: 'input',
                                        name: 'internSchool',
                                        message: 'What is the Interns school?'
                                    }
                                ])
                                    .then(answers => {
                                        const intern = new Intern(
                                            answers.internName,
                                            answers.internId,
                                            answers.internEmail,
                                            answers.internSchool,
                                        );
                                        employees.push(intern);
                                        addEmployee();
                                    })
                            }
                        })
                }
                else if (answer.newEmployeePrompt === 'No') {
                    await makeTeam();
                    console.log('Open team.html from output folder')
                }
            })
    }
    addEmployee();
};

getTeam();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function makeTeam() {
    fs.writeFileSync(outputPath, render(employees), 'utf-8');
}
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
