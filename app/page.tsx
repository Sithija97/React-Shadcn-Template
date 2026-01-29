import { Button } from "@/components/ui/button";
import UserInformation from "@/components/user-infomation";

export default function Home() {
  return (
    <div className="grid">
      <section>
        {/* user information */}
        <UserInformation />
      </section>

      <section>
        {/* post form */}
        {/* post feed */}
      </section>

      <section>{/* widgets */}</section>
    </div>
  );
}
