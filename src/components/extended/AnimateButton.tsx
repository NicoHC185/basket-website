import PropTypes from 'prop-types';
import { forwardRef, Ref } from 'react';
import { motion, useCycle } from 'framer-motion';

interface AnimateButtonProps {
  children?: React.ReactNode;
  offset?: number;
  type?: 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: number | { hover: number; tap: number };
}

const AnimateButton = forwardRef(
  (
    { children, type = 'scale', direction = 'right', offset = 10, scale = { hover: 1, tap: 0.9 } }: AnimateButtonProps,
    ref: Ref<HTMLDivElement>
  ) => {
    let offset1: number | undefined;
    let offset2: number | undefined;

    switch (direction) {
      case 'up':
      case 'left':
        offset1 = offset;
        offset2 = 0;
        break;
      case 'right':
      case 'down':
      default:
        offset1 = 0;
        offset2 = offset;
        break;
    }

    const [x, cycleX] = useCycle<number | undefined>(offset1, offset2);
    const [y, cycleY] = useCycle<number | undefined>(offset1, offset2);

    switch (type) {
      case 'rotate':
        return (
          <motion.div
            ref={ref}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2,
              repeatDelay: 0,
            }}
          >
            {children}
          </motion.div>
        );

      case 'slide':
        if (direction === 'up' || direction === 'down') {
          return (
            <motion.div
              ref={ref as Ref<HTMLDivElement>}
              animate={{ y: y !== undefined ? y : '' }}
              onHoverEnd={() => cycleY()}
              onHoverStart={() => cycleY()}
            >
              {children}
            </motion.div>
          );
        }
        return (
          <motion.div
            ref={ref as Ref<HTMLDivElement>}
            animate={{ x: x !== undefined ? x : '' }}
            onHoverEnd={() => cycleX()}
            onHoverStart={() => cycleX()}
          >
            {children}
          </motion.div>
        );

      case 'scale':
      default:
        if (typeof scale === 'number') {
          scale = {
            hover: scale,
            tap: scale,
          };
        }
        return (
          <motion.div
            ref={ref as Ref<HTMLDivElement>}
            whileHover={{ scale: scale?.hover }}
            whileTap={{ scale: scale?.tap }}
          >
            {children}
          </motion.div>
        );
    }
  }
);

AnimateButton.propTypes = {
  children: PropTypes.node,
  offset: PropTypes.number,
  type: PropTypes.oneOf(['slide', 'scale', 'rotate']),
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  // scale: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

AnimateButton.defaultProps = {
  type: 'scale',
  offset: 10,
  direction: 'right',
  scale: {
    hover: 1,
    tap: 0.9,
  },
};

export default AnimateButton;
