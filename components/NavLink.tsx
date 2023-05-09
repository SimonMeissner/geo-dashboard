import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface Props {
	href: string;
	active?: boolean;
}

export default function NavLink({
	active,
	href,
	children,
}: PropsWithChildren<Props>) {
	const classes = active
		? "mb-2 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
		: "mb-2 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out";

	return (
		<Link href={href} className={classes}>
			{children}
		</Link>
	);
}