/**
 * Created by 李华良 on 2019-10-08
 */
import {ActivityStatus} from "@common/typings";

export interface Tab {
  start: number
  end: number
  status: ActivityStatus
}