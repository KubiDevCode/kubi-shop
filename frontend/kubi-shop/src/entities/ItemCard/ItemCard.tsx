import classNames from 'classnames'
import airpodsImg from '../../shared/mockData/gamepad.jpg'

interface ItemCardProps {
  className?: string
  size: 'small' | 'big'
  title: string
  price?: number
  img: string | undefined
}

export const ItemCard = (props: ItemCardProps) => {
  const { className, size, title, price, img = airpodsImg } = props

  const isSmall = size === 'small'

  let imgMaxHeight = ''

  if (size === 'small' && price) {
    imgMaxHeight = 'max-h-[100px]'
  }

  if (size === 'small' && !price) {
    imgMaxHeight = 'max-h-[120px]'
  }

  if (size === 'big' && price) {
    imgMaxHeight = 'max-h-[130px]'
  }

  if (size === 'big' && !price) {
    imgMaxHeight = 'max-h-[180px]'
  }

  return (
    <div
      className={classNames(
        className,
        'box-border flex flex-col rounded-2xl bg-white px-6.25 py-7.5 border-2 border-border'
      )}
      style={{
        width: isSmall ? '180px' : '200px',
        height: isSmall ? '225px' : '280px',
      }}
    >
      <div className={classNames('flex flex-1 items-center justify-between')}>
        <img
          className={classNames('max-w-full object-contain object-center', imgMaxHeight)}
          src={img}
          alt={title}
        />
      </div>

      <div className="flex flex-col items-center gap-2 h-full justify-end">
        <p className="line-clamp-2 text-center text-base font-medium leading-snug text-black">{title}</p>

        {price && <p className="text-center text-lg font-semibold text-accent">{price}$</p>}
      </div>
    </div>
  )
}
