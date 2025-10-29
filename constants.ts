// Using pexels.com for pose templates. Appending query params to get a consistent size.
const pexelsParams = '?auto=compress&cs=tinysrgb&w=200&h=320&fit=crop';

export interface PoseTemplate {
  url: string;
  name: string;
  category: string;
}

export const POSE_TEMPLATES: PoseTemplate[] = [
  { url: `https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg${pexelsParams}`, name: 'Yoga Warrior II', category: 'Yoga' },
  { url: `https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg${pexelsParams}`, name: 'Yoga Tree Pose', category: 'Yoga' },
  { url: `https://images.pexels.com/photos/1700931/pexels-photo-1700931.jpeg${pexelsParams}`, name: 'Yoga Dancer\'s Pose', category: 'Yoga' },
  { url: `https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg${pexelsParams}`, name: 'Yoga Meditation', category: 'Yoga' },
  { url: `https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg${pexelsParams}`, name: 'Yoga Wheel Pose', category: 'Yoga' },
  { url: `https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg${pexelsParams}`, name: 'Yoga', category: 'Yoga' },
  
  // Artistic Photos
  { url: `https://images.pexels.com/photos/2775460/pexels-photo-2775460.jpeg${pexelsParams}`, name: 'Ballet', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(1).jpg${pexelsParams}`, name: 'Artistic Pose 1', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(10).jpg${pexelsParams}`, name: 'Artistic Pose 2', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(12).jpg${pexelsParams}`, name: 'Artistic Pose 3', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(13).jpg${pexelsParams}`, name: 'Artistic Pose 4', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(14).jpg${pexelsParams}`, name: 'Artistic Pose 5', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(15).jpg${pexelsParams}`, name: 'Artistic Pose 6', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(16).jpg${pexelsParams}`, name: 'Artistic Pose 7', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(4).jpg${pexelsParams}`, name: 'Artistic Pose 8', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(5).jpg${pexelsParams}`, name: 'Artistic Pose 9', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(6).jpg${pexelsParams}`, name: 'Artistic Pose 10', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(7).jpg${pexelsParams}`, name: 'Artistic Pose 11', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(8).jpg${pexelsParams}`, name: 'Artistic Pose 12', category: 'Artistic Photos' },
  { url: `https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(9).jpg${pexelsParams}`, name: 'Artistic Pose 13', category: 'Artistic Photos' },
  
  { url: `https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg${pexelsParams}`, name: 'Sitting/Thinking', category: 'Functional Poses' },
  
  // Sports Poses
  { url: `https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg${pexelsParams}`, name: 'Jumping', category: 'Sports' },
  { url: `https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg${pexelsParams}`, name: 'Basketball Dunk', category: 'Sports' },
  { url: `https://images.pexels.com/photos/6254551/pexels-photo-6254551.jpeg${pexelsParams}`, name: 'Basketball Shooting', category: 'Sports' },
  { url: `https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg${pexelsParams}`, name: 'Basketball Dribbling', category: 'Sports' },
  { url: `https://images.pexels.com/photos/7983633/pexels-photo-7983633.jpeg${pexelsParams}`, name: 'Basketball Defense', category: 'Sports' },
  { url: `https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg${pexelsParams}`, name: 'Soccer Kick', category: 'Sports' },
  { url: `https://images.pexels.com/photos/9444743/pexels-photo-9444743.jpeg${pexelsParams}`, name: 'Soccer Dribbling', category: 'Sports' },
  { url: `https://images.pexels.com/photos/159495/football-player-game-competition-159495.jpeg${pexelsParams}`, name: 'Soccer Goalie Save', category: 'Sports' },
  { url: `https://images.pexels.com/photos/424135/pexels-photo-424135.jpeg${pexelsParams}`, name: 'Table Tennis Serve', category: 'Sports' },
  { url: `https://images.pexels.com/photos/8991461/pexels-photo-8991461.jpeg${pexelsParams}`, name: 'Table Tennis Forehand', category: 'Sports' },
  { url: `https://images.pexels.com/photos/5641973/pexels-photo-5641973.jpeg${pexelsParams}`, name: 'Table Tennis Ready', category: 'Sports' },
  { url: `https://images.pexels.com/photos/1432034/pexels-photo-1432034.jpeg${pexelsParams}`, name: 'Tennis Serve', category: 'Sports' },
  { url: `https://images.pexels.com/photos/5714349/pexels-photo-5714349.jpeg${pexelsParams}`, name: 'Tennis Forehand', category: 'Sports' },
  { url: `https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg${pexelsParams}`, name: 'Tennis Backhand', category: 'Sports' },
  { url: `https://images.pexels.com/photos/1325497/pexels-photo-1325497.jpeg${pexelsParams}`, name: 'Golf Swing', category: 'Sports' },
  { url: `https://images.pexels.com/photos/2244243/pexels-photo-2244243.jpeg${pexelsParams}`, name: 'Golf Follow-through', category: 'Sports' },
  { url: `https://images.pexels.com/photos/9355655/pexels-photo-9355655.jpeg${pexelsParams}`, name: 'Golf Putting', category: 'Sports' },
  
  { url: `https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg${pexelsParams}`, name: 'Pointing', category: 'Functional Poses' },
  { url: `https://images.pexels.com/photos/5952136/pexels-photo-5952136.jpeg${pexelsParams}`, name: 'Superhero pose', category: 'Theme Collection' },
  { url: `https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg${pexelsParams}`, name: 'Walking', category: 'Outdoor Photos' },
  { url: `https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg${pexelsParams}`, name: 'Leaning', category: 'Functional Poses' },
  { url: `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg${pexelsParams}`, name: 'Waving', category: 'Functional Poses' },
  { url: `https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg${pexelsParams}`, name: 'Crouching', category: 'Functional Poses' },
];