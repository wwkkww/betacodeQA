import React, { Component } from 'react';
import axios from 'axios';
import FormField from './FormField';
import { update, generateData, isFormValid } from './FormActions';

class UserForm extends Component {
    //firstName, lastName, Email, birthDate, preferred job title, yearsOfExperience
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            firstname: {
                element: 'input',
                value: '',
                config: {
                    label: 'First name',
                    name: 'firstname_input',
                    type: 'text',
                    placeholder: 'Enter your first name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Last name',
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            birthDate: {
                element: 'input',
                value: '',
                config: {
                    label: 'Birth Date',
                    name: 'birthDate_input',
                    type: 'text',
                    placeholder: 'Enter your date of birth'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            jobTitle: {
                element: 'input',
                value: '',
                config: {
                    label: 'Job title',
                    name: 'jobTitle_input',
                    type: 'text',
                    placeholder: 'Enter your preferred job title'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            yearsOfExperience: {
                element: 'input',
                value: '',
                config: {
                    label: 'Years of experience',
                    name: 'yearsOfExperience_input',
                    type: 'text',
                    placeholder: 'Years of experience'
                },
                validation: {
                    required: false,
                    number: true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true
            }
        }
    };

    updateForm = (e) => {
        const newFormData = update(e, this.state.formData, 'UserForm');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    submitForm = (e) => {
        e.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'UserForm');
        let formIsValid = isFormValid(this.state.formData, 'UserForm');

        console.log(formIsValid)
        if (formIsValid) {
            console.log(dataToSubmit)
            axios.post(`https://api.dummyendpoint/me/profile`, dataToSubmit)
            .then(res => {
              console.log(res);
              console.log('Post Success:', res.data);
            }).catch(error => {
                console.log("Error:", error);
            })
        } else {
            this.setState({ formError: true })
        }

    };

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <form onSubmit={(e) => this.submitForm(e)}>
                            <h2>User Profile</h2>

                            <div className="block">
                                <FormField
                                    id={'firstname'}
                                    formData={this.state.formData.firstname}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>

                            <div className="block">
                                <FormField
                                    id={'lastname'}
                                    formData={this.state.formData.lastname}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>
                            <div className="block">
                                <FormField
                                    id={'email'}
                                    formData={this.state.formData.email}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>

                            <div className="block">
                                <FormField
                                    id={'birthDate'}
                                    formData={this.state.formData.birthDate}
                                    change={(e) => this.updateForm(e)}
                                />

                                {/* <DatePicker
                                        selected={this.state.formData.birthDate}
                                        onChange={(e) => this.updateForm(e)}
                                    /> */}
                            </div>



                            <div className="block">
                                <FormField
                                    id={'jobTitle'}
                                    formData={this.state.formData.jobTitle}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>

                            <div className="block">
                                <FormField
                                    id={'yearsOfExperience'}
                                    formData={this.state.formData.yearsOfExperience}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>

                            <div>
                                {this.state.formError ?
                                    <div className="error_label">
                                        Please check your data
                                        </div> : null}

                                <button onClick={(event) => this.submitForm(event)}>
                                    Add Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserForm;