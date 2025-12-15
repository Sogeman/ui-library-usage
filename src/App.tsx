import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Grid } from "@/components/ui/grid";
import { Input } from "@/components/ui/input";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ContactPage } from "@/pages/ContactPage";
import { useEffect, useState } from "react";

type Page = "home" | "contact";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [subscribed, setSubscribed] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    interest?: string;
    terms?: string;
  }>({});
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!interest) {
      newErrors.interest = "Please select an interest";
    }
    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (currentPage === "contact") {
    return <ContactPage onNavigateHome={() => setCurrentPage("home")} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <svg
            viewBox="0 0 457 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-auto"
          >
            <path
              d="M83.1001 25.3201H116.6V30.0901H88.3301V45.9101H113.62V50.6801H88.3301V66.9001H116.93V71.6701H83.1001V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M140.71 25.3201H145.61L174.81 62.4701V25.3201H179.91V71.6701H175.73L145.81 33.6601V71.6701H140.71V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M206.27 25.3201H222.36C236.93 25.3201 246.99 35.3201 246.99 48.3201V48.4501C246.99 61.4501 236.93 71.6201 222.36 71.6201H206.27V25.3201ZM211.5 30.1501V66.8301H222.36C234.08 66.8301 241.56 58.8801 241.56 48.6201V48.4901C241.56 38.2301 234.08 30.1501 222.36 30.1501H211.5V30.1501Z"
              fill="currentColor"
            ></path>
            <path
              d="M271.3 25.3201H291.23C296.93 25.3201 301.49 27.0401 304.41 29.9501C305.578 31.1634 306.496 32.5952 307.11 34.1635C307.724 35.7319 308.023 37.406 307.99 39.0901V39.2201C307.99 46.9001 302.69 51.4001 295.41 52.7301L309.65 71.6701H303.23L289.79 53.6701H276.53V71.6701H271.3V25.3201ZM290.77 48.9601C297.77 48.9601 302.69 45.3801 302.69 39.4201V39.2901C302.69 33.6001 298.32 30.1501 290.84 30.1501H276.54V48.9501H290.78L290.77 48.9601Z"
              fill="currentColor"
            ></path>
            <path
              d="M338.11 25.3201H332.88V71.6701H338.11V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M364.93 25.3201H370.16V53.0001L396.77 25.3201H403.53L383.66 45.5801L404.39 71.6701H397.83L380.02 49.2201L370.16 59.2201V71.6701H364.93V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M422.08 64.9201L425.33 61.0801C430.16 65.4501 434.8 67.6301 441.22 67.6301C447.44 67.6301 451.55 64.3201 451.55 59.7501V59.6201C451.55 55.3201 449.23 52.8701 439.5 50.8101C428.84 48.4901 423.94 45.0501 423.94 37.4301V37.3101C423.94 30.0301 430.36 24.6601 439.17 24.6601C445.103 24.5006 450.887 26.5295 455.42 30.3601L452.42 34.3601C448.713 31.1338 443.964 29.3578 439.05 29.3601C433.05 29.3601 429.18 32.6701 429.18 36.8401V36.9701C429.18 41.3401 431.56 43.7901 441.76 45.9701C451.96 48.1501 456.86 51.9701 456.86 59.0801V59.2101C456.86 67.1501 450.24 72.3201 441.03 72.3201C433.993 72.3978 427.202 69.7371 422.09 64.9001"
              fill="currentColor"
            ></path>
            <path
              d="M49.71 0V19.08H28.16V16.9H19.16V25.9H28.16V23.71H49.71V33.64H8.99V31.46H0V40.45H8.99V38.27H49.71V48.18H28.16V46H19.16V54.99H28.16V52.81H49.71V72.41H58.71V0H49.71Z"
              fill="#489091"
            ></path>
            <path d="M9 0H0V25.9H9V0Z" fill="#489091"></path>
            <path d="M0 46V46.01V72.42H8.99V46H0Z" fill="#489091"></path>
          </svg>
          <Menu>
            <MenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                  alt="Sarah Chen"
                  fallback="SC"
                />
              </Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuSeparator />
              <div
                className="relative flex w-full cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Dark Mode</span>
                <Switch
                  size="sm"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              </div>
              <MenuSeparator />
              <MenuItem destructive>Sign out</MenuItem>
            </MenuContent>
          </Menu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Now in Beta
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Build beautiful interfaces with our component library
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A carefully crafted collection of accessible, reusable components
              that help you ship faster without sacrificing quality or design.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Everything you need to build
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our components are designed with developer experience in mind,
                making it easy to create stunning interfaces.
              </p>
            </div>
            <Grid cols={3} gap="lg">
              <Card
                title="Lorem ipsum"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              >
                <div className="flex gap-2">
                  <Badge>Lorem ipsum</Badge>
                  <Badge variant="secondary">Lorem ipsum</Badge>
                </div>
              </Card>
              <Card
                title="Dolor sit amet"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              >
                <Button variant="ghost" size="sm">
                  Learn more →
                </Button>
              </Card>
              <Card
                title="Lorem ipsum"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              >
                <Button variant="ghost" size="sm">
                  Learn more →
                </Button>
              </Card>
            </Grid>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-6">
          <div className="max-w-xl mx-auto">
            <Card
              className="text-center"
              title="Stay Updated"
              description="Get notified when we release new components and updates."
            >
              {subscribed ? (
                <Alert variant="success" className="text-left">
                  <AlertTitle>Successfully subscribed!</AlertTitle>
                  <AlertDescription>
                    Thank you for subscribing. You'll receive updates at your
                    email address.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive" className="mb-4 text-left">
                      <AlertTitle>Please fix the errors below</AlertTitle>
                      <AlertDescription>
                        Some required fields are missing or invalid.
                      </AlertDescription>
                    </Alert>
                  )}
                  <form
                    className="space-y-4 text-left"
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (validateForm()) {
                        setSubscribed(true);
                        setErrors({});
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <Input id="name" label="Name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        label="Email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Select
                        id="interest"
                        label="Interest"
                        required
                        placeholder="Select your interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        error={!!errors.interest}
                        options={[
                          { value: "components", label: "UI Components" },
                          { value: "design", label: "Design Systems" },
                          { value: "accessibility", label: "Accessibility" },
                          { value: "performance", label: "Performance" },
                        ]}
                      />
                      {errors.interest && (
                        <p className="text-sm text-destructive">
                          {errors.interest}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Switch
                        label="Also sell my data"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        size="sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Checkbox
                        label="I agree to the terms and conditions"
                        required
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      {errors.terms && (
                        <p className="text-sm text-destructive">
                          {errors.terms}
                        </p>
                      )}
                    </div>
                    <Button className="w-full" type="submit">
                      Subscribe
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </>
              )}
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of developers building amazing products with our
              component library.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" size="lg">
                Start Building
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setCurrentPage("contact")}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <svg
            viewBox="0 0 457 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto opacity-60"
          >
            <path
              d="M83.1001 25.3201H116.6V30.0901H88.3301V45.9101H113.62V50.6801H88.3301V66.9001H116.93V71.6701H83.1001V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M140.71 25.3201H145.61L174.81 62.4701V25.3201H179.91V71.6701H175.73L145.81 33.6601V71.6701H140.71V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M206.27 25.3201H222.36C236.93 25.3201 246.99 35.3201 246.99 48.3201V48.4501C246.99 61.4501 236.93 71.6201 222.36 71.6201H206.27V25.3201ZM211.5 30.1501V66.8301H222.36C234.08 66.8301 241.56 58.8801 241.56 48.6201V48.4901C241.56 38.2301 234.08 30.1501 222.36 30.1501H211.5V30.1501Z"
              fill="currentColor"
            ></path>
            <path
              d="M271.3 25.3201H291.23C296.93 25.3201 301.49 27.0401 304.41 29.9501C305.578 31.1634 306.496 32.5952 307.11 34.1635C307.724 35.7319 308.023 37.406 307.99 39.0901V39.2201C307.99 46.9001 302.69 51.4001 295.41 52.7301L309.65 71.6701H303.23L289.79 53.6701H276.53V71.6701H271.3V25.3201ZM290.77 48.9601C297.77 48.9601 302.69 45.3801 302.69 39.4201V39.2901C302.69 33.6001 298.32 30.1501 290.84 30.1501H276.54V48.9501H290.78L290.77 48.9601Z"
              fill="currentColor"
            ></path>
            <path
              d="M338.11 25.3201H332.88V71.6701H338.11V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M364.93 25.3201H370.16V53.0001L396.77 25.3201H403.53L383.66 45.5801L404.39 71.6701H397.83L380.02 49.2201L370.16 59.2201V71.6701H364.93V25.3201Z"
              fill="currentColor"
            ></path>
            <path
              d="M422.08 64.9201L425.33 61.0801C430.16 65.4501 434.8 67.6301 441.22 67.6301C447.44 67.6301 451.55 64.3201 451.55 59.7501V59.6201C451.55 55.3201 449.23 52.8701 439.5 50.8101C428.84 48.4901 423.94 45.0501 423.94 37.4301V37.3101C423.94 30.0301 430.36 24.6601 439.17 24.6601C445.103 24.5006 450.887 26.5295 455.42 30.3601L452.42 34.3601C448.713 31.1338 443.964 29.3578 439.05 29.3601C433.05 29.3601 429.18 32.6701 429.18 36.8401V36.9701C429.18 41.3401 431.56 43.7901 441.76 45.9701C451.96 48.1501 456.86 51.9701 456.86 59.0801V59.2101C456.86 67.1501 450.24 72.3201 441.03 72.3201C433.993 72.3978 427.202 69.7371 422.09 64.9001"
              fill="currentColor"
            ></path>
            <path
              d="M49.71 0V19.08H28.16V16.9H19.16V25.9H28.16V23.71H49.71V33.64H8.99V31.46H0V40.45H8.99V38.27H49.71V48.18H28.16V46H19.16V54.99H28.16V52.81H49.71V72.41H58.71V0H49.71Z"
              fill="#489091"
            ></path>
            <path d="M9 0H0V25.9H9V0Z" fill="#489091"></path>
            <path d="M0 46V46.01V72.42H8.99V46H0Z" fill="#489091"></path>
          </svg>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hendriks All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
