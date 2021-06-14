import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
  return (
    <div>
      <p className="text-center">
        <strong>
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </strong>
        &nbsp; Ganesh Kumar Macherla
      </p>
      <p className="text-center">
        <strong>
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </strong>
        &nbsp; ganeshkumarmacherla@gmail.com
      </p>
      <p className="text-center">
        <strong>
          <span>
            <FontAwesomeIcon icon={faPhone} />
          </span>
        </strong>
        &nbsp; 7330621325
      </p>
    </div>
  );
};

export default AboutPage;
