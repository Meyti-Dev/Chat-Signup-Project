// dependencies
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// icons
import { HiCheckCircle } from "react-icons/hi2";
// picture
import picture from "../../pictures/transparent-4.png";
// formik
import { Field, Form, Formik } from "formik";
import useSWR from "swr";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

export default function AddUser() {
    // get url params
    const { ID } = useParams();

    // get current user
    const {
        data: userData,
        isLoading: userLoading,
        error: userError,
    } = useSWR("http://localhost:4000/users/", async (url) =>
        axios.get(`${url}${ID}`)
    );

    // modal [ reject, success ]
    const [modal, setModal] = useState(false);

    const { trigger } = useSWRMutation(
        "http://localhost:4000/users/",
        async (url, { arg }) => await axios.put(`${url}${ID}`, arg)
    );

    // formik initialValues
    const initialValues = {
        userName: "",
        fullName: "",
        password: "",
        phoneNumber: "",
        gender: "",
    };

    // validation form values
    const validationForm = () => {
        // errors
        const errors = {};

        // validation with regex

        // returned errors
        return errors;
    };

    // validation form values
    const submitForm = (values) => {
        // submit values
        trigger(values);
        // modal [ open, close ]
        setModal(true);
        setTimeout(() => {
            setModal(false);
        }, 7000);
    };

    // jsx
    return (
        <main className="h-screen flex items-center justify-center">
            {/* container */}
            <div className="container">
                <section className="flex items-center justify-center gap-10 pt-12 pr-5">
                    <div className="relative">
                        <h1 className="text-white text-sm word mb-3">
                            ویرایش مخاطب با شناسه {ID}
                        </h1>
                        {/* shapes */}
                        <div className="absolute -top-12 -left-16 w-28 h-28 bg-yellow-500 shadow-[0_0_1rem_#eab308] rounded-full -z-10"></div>
                        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-yellow-500 shadow-[0_0_1rem_#eab308] rounded-full -z-10"></div>
                        {/* form */}
                        <Formik
                            initialValues={initialValues}
                            validate={validationForm}
                            onSubmit={submitForm}
                        >
                            {({ values, errors }) => (
                                <Form
                                    autoComplete="off"
                                    className="block w-80 p-5 bg-[rgba(63,63,70,.5)] backdrop-blur-md rounded-xl border border-solid border-white/5"
                                >
                                    <div className="space-y-3">
                                        {/* user name */}
                                        <div className="flex items-center justify-between gap-2.5">
                                            <Field
                                                className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60"
                                                name="userName"
                                                type="text"
                                                placeholder="نام کاربری"
                                            />
                                            <HiCheckCircle
                                                className={`text-xl ${
                                                    values.userName?.length >=
                                                        5 &&
                                                    values.userName?.length <=
                                                        15
                                                        ? "text-green-700"
                                                        : "text-red-500"
                                                } shrink-0`}
                                            />
                                        </div>
                                        {/* full name */}
                                        <div className="flex items-center justify-between gap-2.5">
                                            <Field
                                                className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60"
                                                name="fullName"
                                                type="text"
                                                placeholder="نام و نام خانوادگی"
                                            />
                                            <HiCheckCircle
                                                className={`text-xl ${
                                                    values.fullName?.length >=
                                                        5 &&
                                                    values.fullName?.length <=
                                                        25
                                                        ? "text-green-700"
                                                        : "text-red-500"
                                                } shrink-0`}
                                            />
                                        </div>
                                        {/* user password */}
                                        <div className="flex items-center justify-between gap-2.5">
                                            <Field
                                                className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60"
                                                name="password"
                                                type="password"
                                                placeholder="رمز عبور"
                                            />
                                            <HiCheckCircle
                                                className={`text-xl ${
                                                    values.password?.length >=
                                                        8 &&
                                                    values.password?.length <=
                                                        20
                                                        ? "text-green-700"
                                                        : "text-red-500"
                                                } shrink-0`}
                                            />
                                        </div>
                                        {/* user phone number */}
                                        <div className="flex items-center justify-between gap-2.5">
                                            <Field
                                                className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60"
                                                name="phoneNumber"
                                                type="text"
                                                placeholder="شماره تلفن"
                                            />
                                            <HiCheckCircle
                                                className={`text-xl ${
                                                    values.phoneNumber
                                                        ?.length === 11 ||
                                                    values.phoneNumber
                                                        ?.length === 13
                                                        ? "text-green-700"
                                                        : "text-red-500"
                                                } shrink-0`}
                                            />
                                        </div>
                                        {/* user gender */}
                                        <div className="flex items-center justify-between gap-2.5">
                                            <Field
                                                className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60"
                                                name="gender"
                                                type="text"
                                                placeholder="جنسیت"
                                            />
                                            <HiCheckCircle
                                                className={`text-xl ${
                                                    values.gender === "مرد" ||
                                                    values.gender === "زن"
                                                        ? "text-green-700"
                                                        : "text-red-500"
                                                } shrink-0`}
                                            />
                                        </div>
                                    </div>
                                    {/* buttons, [ clear data, submit ] */}
                                    <div className="flex items-center justify-center gap-3 mt-7">
                                        {/* submit */}
                                        <Field
                                            className="flex items-center justify-center w-1/2 h-10 font-vazir-medium rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors -tracking-wider cursor-pointer"
                                            type="submit"
                                            value="ارسال"
                                            disabled={
                                                values.userName?.length >= 5 &&
                                                values.fullName?.length >= 5 &&
                                                values.password?.length >= 8 &&
                                                (values.phoneNumber?.length ===
                                                    11 ||
                                                    values.phoneNumber
                                                        ?.length === 13) &&
                                                (values.gender === "مرد" ||
                                                    values.gender === "زن")
                                                    ? false
                                                    : true
                                            }
                                        />
                                        {/* clear data */}
                                        <button
                                            className="flex items-center justify-center w-1/2 h-10 font-vazir-medium rounded-xl bg-red-500 hover:bg-red-600 transition-colors -tracking-wider cursor-pointer"
                                            type="button"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                    {/* return to main page */}
                                    <Link
                                        to="/"
                                        className="w-full flex items-center justify-center h-10 rounded-xl bg-blue-500 hover:bg-blue-600 mt-3 transition-colors font-vazir-medium -tracking-wider"
                                    >
                                        بازگشت به صفحه اصلی
                                    </Link>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
            </div>

            {/* modal */}
            <div
                className={`fixed ${
                    modal ? "bottom-0" : "-bottom-14"
                } right-0 left-0 flex items-center justify-center h-14 font-vazir-medium bg-yellow-500 transition-all`}
            >
                مخاطب بروزرسانی شد. در صورتی که نمیخواهید دوباره تغییر دهید دکمه
                بازگشت به صفحه اصلی را بزنید.
            </div>

            {/* picture */}
            <img
                className="fixed top-[79px] right-0 w-[500px] -z-10"
                src={picture}
                alt="pictures"
            />
        </main>
    );
}
