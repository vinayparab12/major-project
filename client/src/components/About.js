import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {

  return (
    <div className="container mt-5">
      <form method="GET">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <h1 className="display-4 mb-4">About Us</h1>
            <p className="lead">
              Welcome to our Mock Interview web page! We are passionate about
              helping you excel in your interviews through innovative and
              effective preparation.
            </p>
            <p className="lead">
              At Mock Interview, we understand the importance of practice and
              feedback in interview success. Our platform leverages machine
              learning to simulate real interview scenarios, providing you with
              valuable insights and helping you build confidence.
            </p>
            <p className="lead">
              Whether you're a job seeker, student, or professional, our goal is
              to empower you to shine in your interviews. Explore our diverse
              set of interview scenarios and personalized feedback to enhance
              your skills.
            </p>
            <p className="lead">
              Thank you for choosing Mock Interview for your interview
              preparation journey. Feel free to reach out if you have any
              questions or suggestions. Good luck!
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default About;
