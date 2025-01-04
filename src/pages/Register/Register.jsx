import { Button, Card, Label, TextInput } from "flowbite-react";
import Title from "../../components/reusuable/Title";
import { Link, useNavigate } from "react-router-dom";
import GoogleBtn from "../../components/reusuable/GoogleBtn";
import swal from "sweetalert";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../components/reusuable/Loading";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const { createNewUser, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formProcessing, setFormProcessing] = useState(false);

    useEffect(() => {
        if (formProcessing) return;
        if (user) navigate('/');
    }, [user, navigate, formProcessing])

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const pass = formData.get("pass");
        const passRequirement = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passRequirement.test(pass)) {
            swal('Error!', 'Password must have an uppercase & a lowercase character, a digit & length should be at least 6 characters', 'error');
            return;
        }

        const name = formData.get("name");
        const email = formData.get("email");
        const photoURL = formData.get("photoURL");

        setLoading(true);
        setFormProcessing(true);
        createNewUser(email, pass, name, photoURL)
            .then(() => {
                setLoading(false);
                swal('Success', 'Your are a registered user now.', 'success')
                    .then(() => {
                        navigate('/');
                    })

            }).catch(({ code }) => {
                let message = 'Something went wrong. Please check your internet connection & try again.';
                code === 'auth/email-already-in-use' && (message = 'Email already exists.');

                swal('Error!', message, 'error');
                setLoading(false);
            })
    }

    return (<section className="py-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>Register - MarathonBold</title>
        </Helmet>

        <Card className="max-w-sm mx-auto relative overflow-hidden">
            <Loading loading={loading} />

            <div className="flex">
                <Title title="Register" />
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <div>
                    <div className="mb-2 block">
                        <Label value="Name" />
                    </div>
                    <TextInput name="name" type="text" placeholder="Enter your name" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="Email" />
                    </div>
                    <TextInput name="email" type="email" placeholder="Enter your email" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="Photo URL" />
                    </div>
                    <TextInput name="photoURL" type="text" placeholder="Enter your photo url" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="Password" />
                    </div>
                    <TextInput name="pass" type="password" placeholder="Enter your password" required />
                </div>

                <Button type="submit" className="bg-primary">Register</Button>
            </form>
            <Label className="text-desc text-sm sm:text-base">
                Already have an account?
                <Link to="/login" className="ml-2 text-title dark:text-lite">Login</Link>
            </Label>

            <h3 className="text-center dark:text-lite text-lg font-semibold">OR</h3>

            <GoogleBtn setLoading={setLoading} setFormProcessing={setFormProcessing} to="/home" />
        </Card>
    </section>);
};

export default Register;