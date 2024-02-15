import { ToggleMode } from "@/components/toggle-mode";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="">
			<UserButton afterSignOutUrl="/" />
			<ToggleMode />
		</div>
	);
}
