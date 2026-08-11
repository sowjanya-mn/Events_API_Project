import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer flex flex-row justify-between items-end p-4 bg-base-300 text-base-content">
      <div>
        <p className="text-6xl font-bold">© Gather 2026</p>
      </div>
      <div className="pr-16">
        <a href="https://twitch.tv">
          Twitch
        </a>
        <a href="https://instagram.com">
          Instagram
        </a>
        <a href="https://facebook.com">
          Facebook
        </a>
      </div>
    </footer>
  );
}
