import { useEffect, useState, type FormEvent } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createSubscription = async (email: string) => {
    try {
      const response = await fetch("/api/addSubscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ text: error.message, type: "error" });
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    try {
      setIsLoading(true);
      const response = await createSubscription(email);

      if (response) {
        setMessage({ text: "✅ You've been subscribed", type: "success" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    setEmail("");
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <section className="relative mt-28">
      <div className="container absolute left-1/2 top-8 -translate-x-1/2 md:top-14">
        <div className="mx-auto max-w-[700px] rounded-lg bg-primary-100 px-8 py-9 text-center">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-700">Get early access today</h2>
            <p>
              It only takes a minute to sign up and our free starter tier is
              extremely generous. If you have any questions, our support team
              would be happy to help you.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="md:flex md:items-center md:justify-between md:gap-4">
              <div className="relative w-full">
                <input
                  className={` ${message.type === "error" ? "mb-10" : "mb-4"} h-[45px] w-full rounded-full pl-4 text-black outline-none md:mb-0`}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email@example.com"
                />

                {message.type === "error" && (
                  <p className="absolute bottom-4 left-4 w-full text-left font-700 text-accent-300 md:bottom-[-1.8rem] md:left-2">
                    {message.text}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="relative w-full rounded-full bg-gradient-to-tr from-accent-100 to-accent-200 px-12 py-3 font-700 text-white after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:bg-white after:bg-opacity-0 after:transition-all after:duration-300 after:hover:bg-opacity-40 md:w-1/2 md:px-2"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Get Started For Free"}
              </button>

              {message.type === "success" && (
                <p className="mt-4">{message.text}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
