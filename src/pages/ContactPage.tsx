import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface ContactPageProps {
  onNavigateHome: () => void;
}

export function ContactPage({ onNavigateHome }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.topic) {
      newErrors.topic = "Please select a topic";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
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
          </button>
          <Button variant="ghost" onClick={onNavigateHome}>
            ← Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Get in Touch
                </h1>
                <p className="text-lg text-muted-foreground">
                  Have questions about our component library? We'd love to hear
                  from you. Send us a message and we'll respond as soon as
                  possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">sales@endrik.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <Card title="Send us a message" className="p-6">
              {submitted ? (
                <Alert variant="success">
                  <AlertTitle>Message sent successfully!</AlertTitle>
                  <AlertDescription>
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertTitle>Please fix the errors below</AlertTitle>
                      <AlertDescription>
                        Some required fields are missing or invalid.
                      </AlertDescription>
                    </Alert>
                  )}
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          id="name"
                          label="Name"
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          id="email"
                          label="Email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <Input
                      id="company"
                      label="Company"
                      placeholder="Your company name (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />

                    <div className="space-y-2">
                      <Select
                        id="topic"
                        label="Topic"
                        required
                        placeholder="Select a topic"
                        value={formData.topic}
                        onChange={(e) =>
                          setFormData({ ...formData, topic: e.target.value })
                        }
                        error={!!errors.topic}
                        options={[
                          { value: "sales", label: "Sales Inquiry" },
                          { value: "support", label: "Technical Support" },
                          {
                            value: "enterprise",
                            label: "Enterprise Licensing",
                          },
                          { value: "partnership", label: "Partnership" },
                          { value: "other", label: "Other" },
                        ]}
                      />
                      {errors.topic && (
                        <p className="text-sm text-destructive">
                          {errors.topic}
                        </p>
                      )}
                    </div>

                    <Textarea
                      id="message"
                      label="Message"
                      required
                      rows={4}
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      error={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message}
                      </p>
                    )}

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
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
