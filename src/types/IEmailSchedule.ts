export interface IMailSchedule {
  emailTo: string;
  subject: string;
  message: string;
  tickTime: string;
  dayOfMonth?: number;
  weeksDays?: ("Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday")[];
  whenToStopMails: {
    whenToStop: "never" | "onDate" | "afterSomeOccurency";
    stopDate?: string;
    occurrancy?: number;
  };
  occurrancy: number;
  _id: string;
}

export default IMailSchedule