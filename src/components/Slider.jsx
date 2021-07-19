import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import useWindowDimensions from '../lib/WindowDimensions';

function ArrowLeft(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--left' + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--right' + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  );
}

export default function Slider({ project }) {
  const width = useWindowDimensions();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 4,
    breakpoints: {
      '(max-width: 769px)': {
        slidesPerView: 2,
      },
    },
    spacing: 5,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  return (
    <>
      <div className="navigation-wrapper">
        {slider && width > 769 && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || slider.prev()}
              disabled={currentSlide === 0}
            />
            <ArrowRight
              onClick={(e) => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
        <div ref={sliderRef} className="keen-slider">
          {project.galleryImages !== undefined &&
            project.galleryImages.map((img, i) => (
              <img
                src={img}
                className={`keen-slider__slide number-slide` + i}
                key={i}
              />
            ))}
        </div>

        {slider && (
          <div className="dots">
            {[...Array(slider.details().size).keys()].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    slider.moveToSlideRelative(idx);
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}
                />
              );
            })}
          </div>
        )}
      </div>

      <style jsx>
        {`
          a {
            color: #222;
            display: inline-block;
          }
          h2 {
            margin: 0;
            font-weight: 500;
          }
          .keen-slider {
            border: 2px solid #222;
            border-radius: 4px;
            margin: 10px 0px;
          }
          .keen-slider__slide {
            width: 100%; /*width of parent container*/
            object-fit: contain;
          }

          .navigation-wrapper {
            width: 100%;
            min-width: 100%;
            position: relative;
          }

          @media (min-width: 769px) {
            .navigation-wrapper {
              width: 75%;
              min-width: 75%;
              position: relative;
            }
          }

          .dots {
            display: flex;
            padding: 10px 0;
            justify-content: center;
          }

          .dot {
            border: none;
            width: 6px;
            height: 6px;
            background: #c5c5c5;
            border-radius: 50%;
            margin: 0 5px;
            padding: 5px;
            cursor: pointer;
          }

          .dot:focus {
            outline: none;
          }

          .dot.active {
            background: #000;
          }
        `}
      </style>
    </>
  );
}
