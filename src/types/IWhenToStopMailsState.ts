import WhenToStop from '../enums/WhenToStop'

interface IWhenToStopMailsState {
  whenToStop: WhenToStop,
  stopDate: Date,
  occurrancy: number,
}

export default IWhenToStopMailsState