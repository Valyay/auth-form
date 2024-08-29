import { useState } from "react";
import "./App.css";

interface Response {
  success: boolean;
  message: string;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEmailError || isPasswordError) {
      setErrorMessage("Fill the fields!");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await new Promise<Response>((resolve) => {
        setTimeout(() => {
          const isValidUser =
            email === "test@example.com" && password === "password123";
          if (isValidUser) {
            resolve({ success: true, message: "Login successful!" });
          } else {
            resolve({ success: false, message: "Invalid login or password" });
          }
        }, 2000);
      });

      if (response.success) {
        setSuccessMessage(response.message);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main>
        <div className="login-container">
          <form onSubmit={handleSubmit} aria-labelledby="login-title">
            <div className="title-container">
              <h1>Login</h1>
            </div>
            <div className="input-container">
              <label htmlFor="email">
                E-mail
                <input
                  id="email"
                  value={email}
                  type="email"
                  className={isEmailError ? "error" : ""}
                  autoComplete="username"
                  placeholder="test@example.com"
                  aria-invalid={true}
                  aria-errormessage="email-error"
                  onFocus={() => {
                    setIsEmailError(false);
                  }}
                  onBlur={() => {
                    if (!email) {
                      setIsEmailError(true);
                    }
                  }}
                  onChange={(event) => {
                    setErrorMessage("");
                    setEmail(event.target.value);
                  }}
                />
              </label>
            </div>
            <div className="input-container">
              <label htmlFor="password">
                Password
                <input
                  id="password"
                  value={password}
                  type="password"
                  className={isPasswordError ? "error" : ""}
                  autoComplete="current-password"
                  aria-invalid={true}
                  aria-errormessage="password-error"
                  minLength={1}
                  onFocus={() => {
                    setIsPasswordError(false);
                  }}
                  onBlur={() => {
                    if (!password) {
                      setIsPasswordError(true);
                    }
                  }}
                  onChange={(event) => {
                    setErrorMessage("");
                    setPassword(event.target.value);
                  }}
                />
              </label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <button disabled={isLoading} type="submit">
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                <span className="login">Login</span>
              )}
            </button>
            <div className="links">
              <span>
                Forgot your password? <a href="/restore">Reset it here</a>
              </span>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
