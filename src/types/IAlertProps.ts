interface IAlertProps {
  status: 'success' | 'error',
  message: string,
  onCloseClick?: Function,
}

export default IAlertProps