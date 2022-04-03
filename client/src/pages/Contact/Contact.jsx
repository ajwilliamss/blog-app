import Sidebar from "../../components/Sidebar/Sidebar";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="contact-section">
        <h3>Contact</h3>
        <form className="contact-form">
          {/* Input */}
          <div className="contact-group">
            <input type="text" name="name" placeholder="Enter name" />
            <input type="email" name="email" placeholder="Enter email" />
          </div>

          {/* Text */}
          <textarea name="message" placeholder="Enter message"></textarea>

          {/* Button */}
          <button type="submit">Send</button>
        </form>
      </div>
      <Sidebar />
    </section>
  );
};

export default Contact;
