import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default Theme = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </Button>
        <Button
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
        </Button>
        <Button
          onClick={() => {
            setTheme("modern");
          }}
        >
          Modern
        </Button>
      </div>
    </>
  );
};
