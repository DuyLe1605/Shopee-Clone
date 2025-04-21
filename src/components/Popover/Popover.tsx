import { useId, useRef, useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingPortal,
  useHover,
  useInteractions,
  safePolygon,
  arrow,
  Placement
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  type?: 'user' | 'language' | 'cart'
}

const tooltipType = {
  user: { transformOrigin: 'center top', placement: 'top' },
  language: { transformOrigin: '85% 0%', placement: 'bottom-end' },
  cart: { transformOrigin: '95% top', placement: 'bottom-end' }
}

// Component
export default function Popover({ children, renderPopover, className, type = 'user' }: Props) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { strategy, refs, floatingStyles, context, middlewareData } = useFloating({
    placement: tooltipType[type].placement as Placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    transform: false
  })
  const hover = useHover(context, { move: false, handleClose: safePolygon() })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}

      {/* Tool Tip */}
      <FloatingPortal {...getFloatingProps()} id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='Tooltip'
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                position: strategy,
                transformOrigin: tooltipType[type].transformOrigin
              }}
              // Animation
              exit={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {/* Arrow */}
              <span
                ref={arrowRef}
                className={`border-x-transparent border-t-transparent border-b-white absolute border-[11px] z-[1] -translate-y-[96%]  cursor-pointer ${type === 'cart' ? '-translate-x-[-130%]' : ''}`}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />

              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
