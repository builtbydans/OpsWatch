import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button variant="outline" asChild>
      <a href="/logout">Logout</a>
    </Button>
  );
}
