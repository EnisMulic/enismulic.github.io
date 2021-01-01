import React from 'react';
import { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Image from '../Image';

import style from './Carousel.module.css';

const Carousel = (props) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const lastIndex: number = props.slides.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, props.slides]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className={style.center}>
      {props.slides.map((slide: any, slideIndex: number) => {
        const { id, image } = slide;

        let position: string = 'nextSlide';
        if (slideIndex === index) {
          position = 'activeSlide';
        }
        if (
          slideIndex === index - 1 ||
          (index === 0 && slideIndex === props.slides.length - 1)
        ) {
          position = 'lastSlide';
        }

        return <Image key={id} image={image} position={position}></Image>;
      })}

      <button className={style.prev} onClick={() => setIndex(index - 1)}>
        <FiChevronLeft />
      </button>
      <button className={style.next} onClick={() => setIndex(index + 1)}>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
