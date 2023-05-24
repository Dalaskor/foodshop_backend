import { HttpStatus } from "@nestjs/common";

export interface ResultResponse {
  status: HttpStatus,
  message: string,
}
