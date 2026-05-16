import { Container } from '../../shared/Container/Container'

import dhlSVG from '../../assets/icons/footer/DHL.svg'
import postSVG from '../../assets/icons/footer/post.svg'
import visaSVG from '../../assets/icons/footer/visa.svg'
import paypalSVG from '../../assets/icons/footer/fontisto_paypal.svg'
import mastercardSVG from '../../assets/icons/footer/mastercard.svg'

export const Footer = () => {
  return (
    <footer className="self-stretch py-5 border-t border-neutral-200 flex justify-between items-center">
      <Container className="flex justify-between">
        <div className="size- inline-flex justify-start items-start gap-11">
          <div className="size- inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-neutral-800 text-xl font-extralight font-['Outfit'] tracking-tight">
              We ship with:
            </div>
            <img
              src={dhlSVG}
              alt="DHL"
            />
            <img
              src={postSVG}
              alt="Post"
            />
          </div>
          <div className="size- inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-neutral-800 text-xl font-extralight font-['Outfit'] tracking-tight">
              Payment options::
            </div>
            <img
              src={visaSVG}
              alt="Visa"
            />
            <img
              src={mastercardSVG}
              alt="MasterCard"
            />
            <img
              src={paypalSVG}
              alt="PayPal"
            />
          </div>
        </div>
        <div className="justify-start">
          <span className="text-neutral-800 text-xl font-extralight font-['Outfit'] tracking-tight">
            © Copyright 2024 ShopLite. Design by{' '}
          </span>
          <span className="text-neutral-800 text-xl font-extralight font-['Outfit'] underline tracking-tight">
            TemplatesJungle
          </span>
        </div>
      </Container>
    </footer>
  )
}
