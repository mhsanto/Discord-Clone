import { initialProfile } from "@/lib/initial-profile";
const SetupPage = async () => {
  const profile = await initialProfile()
  return <div></div>;
};

export default SetupPage;
