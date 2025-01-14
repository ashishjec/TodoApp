"use client";
import AddTodo from "@/components/AddTodo";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TodosMessage from "@/components/TodosMessage";
import axios from "axios";

type Props = {};

const Page = (props: Props) => {
	const router = useRouter();

	const logout = async () => {
		try {
			await axios.get("api/users/logout");
			// toast.success(`User logged out`, successState);
			router.push("/login");
		} catch (error: any) {
			if (error.response && error.response.data && error.response.data.error) {
				console.log("Error logging out:", error.response.data.error);
				// toast({title: error.response.data.error, variant: "destructive"});
			} else {
				console.log("Error logging out:", error.message);
				// toast({title: error.message, variant: "destructive"});
			}
		}
	};

	return (
		<>
			<main className="p-5 inset-0 mx-auto md:w-[75vh]">
				<div className="flex justify-end p-2">
					<button onClick={logout} className="bg-red-600 rounded-md p-2">
						Logout
					</button>
				</div>
				<h1 className="font-bold text-2xl flex flex-col justify-center items-center border-b my-5 py-5 border-gray-600 ">
					TODO APP
				</h1>
				<Navbar />
				<AddTodo />
				<TodosMessage />
			</main>
		</>
	);
};

export default Page;
