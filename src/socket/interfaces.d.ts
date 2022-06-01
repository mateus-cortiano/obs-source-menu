/* models.ts */

export interface OBSEvents {
  TransitionBegin: (from_scene: string, to_scene: string) => void
  SwitchScenes: (from_scene: string, to_scene: string) => void
  SourceCreated: (source_name: string) => void
}

export interface OBSMessage {
  message_id?: string | number
  salt?: string
  challenge?: string
  request_type?: string
  update_type?: string
  error?: string
  active?: number
  name?: string
  scenes?: any
  scene_name?: string
  current_scene?: string
  authRequired?: string
  auth?: string
}
