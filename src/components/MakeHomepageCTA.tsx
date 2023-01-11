import { useMyNews } from "../context/MyNewsContext";
import Lovepik from "../assets/images/Lovepik.png";
import "../styles/MakeHomepageCTA.scss";

const MakeHomepageCTA = () => {
  const { showCTA, setShowCTA, showCTABuble, setShowCTABuble } = useMyNews();
  return (
    <>
      {showCTA && (
        <section className="l-make-homepage">
          <img src={Lovepik} alt="" />
          <div className="container">
            {showCTABuble && (
              <article>
                <p>
                  <strong>How do I pin a website to my home screen?</strong>
                  <br />
                  Android
                  <br />
                  Open Chrome.
                  <br />
                  Navigate to the website or web page you want to pin to your
                  home screen.
                  <br />
                  Tap the menu icon (3 dots in upper right-hand corner) and tap
                  Add to homescreen.
                  <br />
                  Choose a name for the website shortcut, then Chrome will add
                  it to your home screen
                  <br />
                  <br />
                  <strong>How do I set a default page in Chrome?</strong>
                  <br />
                  Choose your homepage
                  <br />
                  On your Android phone or tablet, open the Chrome app .<br />
                  At the top right, tap More. Settings.
                  <br />
                  Under "Advanced," tap Homepage.
                  <br />
                  Choose Chrome's homepage or a custom page.
                  <br />
                </p>
                <button onClick={() => setShowCTABuble(false)}>Close it</button>
              </article>
            )}
            <div className="row">
              <div>
                <strong>Make MyNews your homepage</strong>
                <span>Every day discover what’s trending on the internet!</span>
              </div>
              <div>
                <button
                  className="c-make-homepage-get"
                  onClick={() => setShowCTABuble(true)}
                >
                  GET
                </button>
                <button
                  className="c-make-homepage-no"
                  onClick={() => setShowCTA(false)}
                >
                  No, thanks
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MakeHomepageCTA;
