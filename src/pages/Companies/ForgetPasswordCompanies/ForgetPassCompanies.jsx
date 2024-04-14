import classes from "./ForgetPassCompanies.module.css";
import {Button, Title} from "@mantine/core";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ForgetPassCompaniesSchema from "./ForgetPassCompaniesSchema/ForgetPassCompaniesSchema";
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";
import {httpRequest} from "../../../utils/httpRequest.js";
import API_CONFIG from "../../../utils/apiConfig.js";


export default function ForgetPassCompanies() {


    const navigate = useNavigate();

    function sendCode(values) {

        const data = {email: values.email};
        httpRequest(API_CONFIG.endpoints.auth.forgetPassword, "POST", data).then((res) => {
            if (res.status === 200) {
                notifications.show({
                    message: 'check your Gmail',
                    color: "green",
                });
                setTimeout(() => {
                    navigate("/UpdatePasswordUser")
                }, 1000)
            }
            localStorage.setItem("gmail", data.email)

        });

    }

    return (
        <div className={classes.style}>
            <div>
                <Title ta="center" mt={"50px"} className={classes.title}>
                    Forget password to companies
                </Title>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "50px 0px 0px",
                    paddingBottom: "50px",
                }}
            >
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={ForgetPassCompaniesSchema}
                    onSubmit={sendCode}
                >
                    <Form className={classes.form}>
                        <div>
                            <label className={classes.label} htmlFor="email">
                                Email:
                            </label>
                            <br/>
                            <Field
                                className={classes.field}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ErrorMessage
                                style={{color: "red"}}
                                name="email"
                                component={"div"}
                            />
                        </div>
                        <br/>
                        <div>
                            <Button
                                type="submit"
                                style={{width: "100%", margin: "10px auto 10px"}}
                            >
                                Send code
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
