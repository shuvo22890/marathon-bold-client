import axios from "axios";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import Title from "../../../components/reusuable/Title";
import { Fade } from "react-awesome-reveal";
import MarathonCard from "../../../components/reusuable/MarathonCard";
import { Link } from "react-router-dom";

const Marathons = () => {
    const [marathons, setMarathons] = useState(null);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isVisible) return;
        setErr(false);
        axios("https://a11-server-weld.vercel.app/marathons?size=8")
            .then(({ data }) => {
                setMarathons(data)
                setLoading(false)
            })
            .catch(() => setErr(true))
    }, [isVisible]);

    return (<section className="py-20 px-3">
        <Title title="Our Marathons" />

        <Fade delay={300} triggerOnce={true} onVisibilityChange={inview => inview && setIsVisible(true)}>
            {
                loading ? <div className="text-center py-20">
                    {err ? <h3 className="text-xl text-yellow-400">Oops! Something went wrong.</h3> : <Spinner />}
                </div> : <div className="max-w-sm sm:max-w-screen-xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-3 xl:gap-5 mt-10">
                    {marathons?.map(marathon => (
                        <MarathonCard
                            key={marathon._id}
                            marathon={marathon}
                        />))}
                </div>
            }
            <Link to="/marathons" className="bg-primary-lite hover:bg-primary rounded-md px-8 py-2 text-lite font-semibold text-lg uppercase mx-auto block w-fit mt-10">View All</Link>
        </Fade>
    </section>);
};

export default Marathons;