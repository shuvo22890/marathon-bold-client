import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleBtn from "../../components/reusuable/GoogleBtn";
import Title from "../../components/reusuable/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { loginUser, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formProcessing, setFormProcessing] = useState(false);
    const { state } = useLocation();

    useEffect(() => {
        if (formProcessing) return;
        if (user) navigate('/');
    }, [user, navigate, formProcessing]);

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pass = form.pass.value;

        setLoading(true);
        setFormProcessing(true);
        loginUser(email, pass)
            .then(() => {
                setLoading(false);
                swal("Done", "Login is successfull", "success")
                    .then(() => {
                        navigate(state || '/');
                    })

            }).catch(({ code }) => {
                setLoading(false);
                let msg = "Someting went wrong!";
                if (code === 'auth/invalid-credential') {
                    msg = "Invalid Email Or Password";
                }
                swal("Error!", msg, "error");
            })
    }

    return (<section className="py-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>Login - MarathonBold</title>
        </Helmet>

        <Card className="max-w-sm mx-auto relative overflow-hidden">
            <Loading loading={loading} />

            <div className="flex">
                <Title title="Login" />
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div>
                    <div className="mb-2 block">
                        <Label value="Email" />
                    </div>
                    <TextInput name="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label value="Password" />
                    </div>
                    <TextInput name="pass" type="password" placeholder="Enter your password" required />
                </div>

                <Button type="submit" className="bg-primary">Login</Button>
            </form>
            <Label className="text-desc text-sm sm:text-base">
                Don&apos;t have an account?
                <Link to="/register" className="ml-2 text-title dark:text-lite">Register</Link>
            </Label>

            <h3 className="text-center dark:text-lite text-lg font-semibold">OR</h3>

            <GoogleBtn setLoading={setLoading} setFormProcessing={setFormProcessing} to={state || "/home"} />
        </Card>
    </section>);
};

export default Login;