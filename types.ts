
export interface Scene {
  id: number;
  title: string;
  videoUrl: string;
  subtitle: string;
  audioText: string;
  color: string;
  emoji: string;
}

export interface Section {
  title: string;
  scenes: Scene[];
}
