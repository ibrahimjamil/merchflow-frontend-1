import { Modal, createStyles } from '@mantine/core';
import { ReactNode } from 'react';



type ModalComponentProps = {
  open: boolean;
  close: () => void;
  title?: ReactNode;
  data: any;
}

const useStyles = createStyles(() => ({
  header: {
    borderBottom: '1px solid #f5f2f2',
    paddingBottom: '1rem' 
  },
  brandName: {
    marginBottom: '1rem',
  },
  styleName: {
    paddingLeft: '0.2rem',
  }
}))


const ProductDescriptionModal = (props: ModalComponentProps) => {
  const { classes } = useStyles()
  const { open, close, title, data } = props || {}
  return (
      <Modal
        opened={open}
        onClose={close}
        centered={true}
        title={title}
        size="calc(28%)"
        className="product-modal"
      >
        <div className={classes.brandName}>
          <strong>{data?.brand?.brandName}</strong>
          <span className={classes.styleName}> {data?.brand?.styleName}</span>
        </div>
        <p>{data?.Description}</p>
        <p>{data.Full_Description}</p>
      </Modal>
  )
}

export default ProductDescriptionModal;