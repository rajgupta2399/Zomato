import { Input } from "postcss/lib/input";
import InputButton from "./InputButton";
import "../../App.css";

export default function Banner() {
  return (
    <>
      <div
        className="hero min-h-[25vw] object-cover"
        style={{
          backgroundImage:
            "url(https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png)",
        }}
      >
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div class="flex justify-center">
              <img
                src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png"
                className="h-16 img"
                alt=""
              />
            </div>
            <p className="mb-5 text-[20px] mt-2 sm:text-[10px] text">
              Discover the best food & drinks in Delhi NCR
            </p>
            <InputButton />
          </div>
        </div>
      </div>
    </>
  );
}
