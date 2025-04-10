declare namespace THREE {
  class Scene {
    background: Color;
    add(object: Object3D): this;
  }
  
  class PerspectiveCamera extends Object3D {
    constructor(fov: number, aspect: number, near: number, far: number);
    aspect: number;
    updateProjectionMatrix(): void;
    lookAt(x: number, y: number, z: number): void;
    lookAt(vector: Vector3): void;
  }
  
  class WebGLRenderer {
    constructor(parameters?: { canvas?: HTMLCanvasElement; antialias?: boolean });
    setSize(width: number, height: number, updateStyle?: boolean): void;
    render(scene: Scene, camera: Camera): void;
  }
  
  class Color {
    constructor(color: number | string);
  }
  
  class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }
  
  class Euler {
    x: number;
    y: number;
    z: number;
  }
  
  class Object3D {
    position: Vector3;
    rotation: Euler;
    lookAt(vector: Vector3): void;
    lookAt(x: number, y: number, z: number): void;
    add(object: Object3D): this;
  }
  
  class Camera extends Object3D {
    constructor();
  }
  
  class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
    geometry: BufferGeometry;
  }
  
  class Box3 {
    constructor();
    setFromObject(object: Object3D): this;
    intersectsBox(box: Box3): boolean;
  }
  
  class BufferGeometry {
    parameters: any;
  }
  
  class Material {
    constructor();
  }
  
  class MeshStandardMaterial extends Material {
    constructor(parameters?: { color?: number | string; roughness?: number });
  }
  
  class BoxGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, depth?: number);
  }
  
  class PlaneGeometry extends BufferGeometry {
    constructor(width?: number, height?: number);
  }
  
  class AmbientLight extends Light {
    constructor(color?: number | string, intensity?: number);
  }
  
  class DirectionalLight extends Light {
    constructor(color?: number | string, intensity?: number);
  }
  
  class Light extends Object3D {
    constructor(color?: number | string, intensity?: number);
  }
}

/**
 * Game configuration constants
 */
namespace GameConfig {
  export const GRAVITY: number = 0.01;
  export const JUMP_FORCE: number = 0.3;
  export const PLAYER_SPEED: number = 0.2;
  export const BASE_OBSTACLE_SPEED: number = 0.2;
  export const SPEED_INCREMENT: number = 0.05;
  
  export const BOUNDARY_LEFT: number = -8;
  export const BOUNDARY_RIGHT: number = 8;
  
  export const POINTS_PER_OBSTACLE: number = 10;
  export const SPEED_INCREASE_THRESHOLD: number = 100;
  
  export const OBSTACLE_COUNT: number = 20;
  export const OBSTACLE_ZONE_MIN: number = 20;
  export const OBSTACLE_ZONE_MAX: number = 200;
  
  export const PLAYER_SIZE: number = 1;
  export const PLAYER_START_Y: number = 0.5;
  export const PLAYER_START_Z: number = 0;
}

/**
 * Game state types and interfaces
 */
interface GameState {
  score: number;
  speed: number;
  gameOver: boolean;
  playerJumping: boolean;
}

enum ObstacleType {
  STANDARD,
  ROTATING,
  MOVING_HORIZONTAL,
  TALL
}

class Obstacle {
  public mesh: THREE.Mesh;
  public type: ObstacleType;
  public baseX: number = 0;
  public moveDirection: number = 1;
  public rotationSpeed: number = 0;
  
  constructor(mesh: THREE.Mesh, type: ObstacleType) {
    this.mesh = mesh;
    this.type = type;
    this.baseX = mesh.position.x;
    
    switch (type) {
      case ObstacleType.ROTATING:
        this.rotationSpeed = Math.random() * 0.05 + 0.01;
        break;
      case ObstacleType.MOVING_HORIZONTAL:
        this.moveDirection = Math.random() > 0.5 ? 1 : -1;
        break;
    }
  }
  
  public update(deltaTime: number): void {
    switch (this.type) {
      case ObstacleType.ROTATING:
        this.mesh.rotation.y += this.rotationSpeed;
        this.mesh.rotation.x += this.rotationSpeed * 0.5;
        break;
      case ObstacleType.MOVING_HORIZONTAL:
        this.mesh.position.x += this.moveDirection * 0.05;
        if (Math.abs(this.mesh.position.x - this.baseX) > 3) {
          this.moveDirection *= -1;
        }
        break;
    }
  }
}

class CubeRunner {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  
  private player!: THREE.Mesh;
  private obstacles: Obstacle[] = [];
  private ground!: THREE.Mesh;
  
  private gameState: GameState = {
    score: 0,
    speed: GameConfig.BASE_OBSTACLE_SPEED,
    gameOver: false,
    playerJumping: false
  };
  
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private jumpVelocity: number = 0;
  
  private keys: { [key: string]: boolean } = {};
  
  constructor() {
    this.initScene();
    this.initPlayer();
    this.initGround();
    this.initLights();
    this.initEventListeners();
    this.createObstacles();
    this.gameLoop(0);
  }
  
  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);
    
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, -10);
    
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    this.scene.add(directionalLight);
  }
  
  private initGround(): void {
    const groundGeometry = new THREE.PlaneGeometry(20, 1000);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x44aa44,
      roughness: 0.8,
    });
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.z = -500;
    this.scene.add(this.ground);
  }
  
  private initPlayer(): void {
    const playerGeometry = new THREE.BoxGeometry(
      GameConfig.PLAYER_SIZE, 
      GameConfig.PLAYER_SIZE, 
      GameConfig.PLAYER_SIZE
    );
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00aaff });
    this.player = new THREE.Mesh(playerGeometry, playerMaterial);
    this.player.position.y = GameConfig.PLAYER_START_Y;
    this.player.position.z = GameConfig.PLAYER_START_Z;
    this.scene.add(this.player);
  }
  
  private initEventListeners(): void {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
      restartButton.addEventListener('click', this.restartGame.bind(this));
    }
  }
  
  private handleKeyDown(event: KeyboardEvent): void {
    this.keys[event.key] = true;
  }
  
  private handleKeyUp(event: KeyboardEvent): void {
    this.keys[event.key] = false;
  }
  
  private handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  private createObstacles(): void {
    for (let i = 0; i < GameConfig.OBSTACLE_COUNT; i++) {
      const typeIndex = Math.floor(Math.random() * Object.keys(ObstacleType).length / 2);
      const type = typeIndex as ObstacleType;
      
      let obstacleGeometry: THREE.BufferGeometry;
      
      switch (type) {
        case ObstacleType.TALL:
          obstacleGeometry = new THREE.BoxGeometry(1, Math.random() * 4 + 3, 1);
          break;
        default:
          obstacleGeometry = new THREE.BoxGeometry(
            Math.random() * 3 + 1,
            Math.random() * 3 + 1,
            Math.random() * 2 + 1
          );
      }
      
      let color: number;
      switch (type) {
        case ObstacleType.STANDARD:
          color = 0xff0000;
          break;
        case ObstacleType.ROTATING:
          color = 0xff5500;
          break;
        case ObstacleType.MOVING_HORIZONTAL:
          color = 0xffaa00;
          break;
        case ObstacleType.TALL:
          color = 0xaa0000;
          break;
      }
      
      const obstacleMaterial = new THREE.MeshStandardMaterial({ color });
      
      const obstacleMesh = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
      
      obstacleMesh.position.x = Math.random() * 16 - 8;
      obstacleMesh.position.y = obstacleMesh.geometry.parameters.height / 2;
      obstacleMesh.position.z = -(Math.random() * GameConfig.OBSTACLE_ZONE_MAX + GameConfig.OBSTACLE_ZONE_MIN);
      
      const obstacle = new Obstacle(obstacleMesh, type);
      this.obstacles.push(obstacle);
      this.scene.add(obstacleMesh);
    }
  }
  
  private movePlayer(deltaTime: number): void {
    const movementSpeed = GameConfig.PLAYER_SPEED * deltaTime;
    
    if ((this.keys['ArrowLeft'] || this.keys['a']) && this.player.position.x > GameConfig.BOUNDARY_LEFT) {
      this.player.position.x -= movementSpeed;
    }
    if ((this.keys['ArrowRight'] || this.keys['d']) && this.player.position.x < GameConfig.BOUNDARY_RIGHT) {
      this.player.position.x += movementSpeed;
    }
    
    if ((this.keys[' '] || this.keys['ArrowUp'] || this.keys['w']) && !this.gameState.playerJumping && this.player.position.y <= GameConfig.PLAYER_START_Y + 0.1) {
      this.jumpVelocity = GameConfig.JUMP_FORCE;
      this.gameState.playerJumping = true;
    }
    
    if (this.gameState.playerJumping || this.player.position.y > GameConfig.PLAYER_START_Y) {
      this.player.position.y += this.jumpVelocity * deltaTime;
      this.jumpVelocity -= GameConfig.GRAVITY * deltaTime;
      
      if (this.player.position.y <= GameConfig.PLAYER_START_Y && this.jumpVelocity < 0) {
        this.player.position.y = GameConfig.PLAYER_START_Y;
        this.jumpVelocity = 0;
        this.gameState.playerJumping = false;
      }
    }
  }
  
  private updateObstacles(deltaTime: number): void {
    this.obstacles.forEach(obstacle => {
      obstacle.mesh.position.z += this.gameState.speed * deltaTime;
      obstacle.update(deltaTime);
      
      if (obstacle.mesh.position.z > 10) {
        obstacle.mesh.position.z = -(Math.random() * GameConfig.OBSTACLE_ZONE_MAX + GameConfig.OBSTACLE_ZONE_MIN);
        obstacle.mesh.position.x = Math.random() * 16 - 8;
        obstacle.baseX = obstacle.mesh.position.x;
        
        this.gameState.score += GameConfig.POINTS_PER_OBSTACLE;
        this.updateScore();
        
        if (this.gameState.score % GameConfig.SPEED_INCREASE_THRESHOLD === 0) {
          this.gameState.speed += GameConfig.SPEED_INCREMENT;
          this.showMessage(`Speed increased! Current speed: ${this.gameState.speed.toFixed(2)}`);
        }
      }
      
      if (this.checkCollision(this.player, obstacle.mesh)) {
        this.endGame();
      }
    });
  }
  
  private checkCollision(player: THREE.Mesh, obstacle: THREE.Mesh): boolean {
    const playerBox = new THREE.Box3().setFromObject(player);
    const obstacleBox = new THREE.Box3().setFromObject(obstacle);
    return playerBox.intersectsBox(obstacleBox);
  }
  
  private showMessage(message: string): void {
    const messageContainer = document.createElement('div');
    messageContainer.innerText = message;
    messageContainer.style.position = 'absolute';
    messageContainer.style.top = '50%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.backgroundColor = 'rgba(0,0,0,0.7)';
    messageContainer.style.color = 'white';
    messageContainer.style.padding = '10px 20px';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.fontSize = '20px';
    messageContainer.style.zIndex = '100';
    
    document.body.appendChild(messageContainer);
    
    setTimeout(() => {
      document.body.removeChild(messageContainer);
    }, 2000);
  }
  
  private updateScore(): void {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
      scoreElement.textContent = this.gameState.score.toString();
    }
  }
  
  private endGame(): void {
    this.gameState.gameOver = true;
    
    const gameOverElement = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    
    if (gameOverElement) {
      gameOverElement.classList.remove('hidden');
    }
    
    if (finalScoreElement) {
      finalScoreElement.textContent = this.gameState.score.toString();
    }
    
    const highScore = localStorage.getItem('cubeRunnerHighScore') ? 
      parseInt(localStorage.getItem('cubeRunnerHighScore')!) : 0;
      
    if (this.gameState.score > highScore) {
      localStorage.setItem('cubeRunnerHighScore', this.gameState.score.toString());
      this.showMessage('New High Score!');
    }
    
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  private restartGame(): void {
    this.gameState = {
      score: 0,
      speed: GameConfig.BASE_OBSTACLE_SPEED,
      gameOver: false,
      playerJumping: false
    };
    
    this.jumpVelocity = 0;
    this.updateScore();
    
    const gameOverElement = document.getElementById('game-over');
    if (gameOverElement) {
      gameOverElement.classList.add('hidden');
    }
    
    this.player.position.set(0, GameConfig.PLAYER_START_Y, 0);
    
    this.obstacles.forEach(obstacle => {
      obstacle.mesh.position.z = -(Math.random() * GameConfig.OBSTACLE_ZONE_MAX + GameConfig.OBSTACLE_ZONE_MIN);
      obstacle.mesh.position.x = Math.random() * 16 - 8;
      obstacle.baseX = obstacle.mesh.position.x;
    });
    
    this.lastFrameTime = performance.now();
    this.gameLoop(this.lastFrameTime);
  }
  
  private gameLoop(timestamp: number): void {
    if (this.gameState.gameOver) return;
    
    const deltaTime = (timestamp - this.lastFrameTime) / 16.667;
    this.lastFrameTime = timestamp;
    
    if (deltaTime < 0 || deltaTime > 5) {
      this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
      return;
    }
    
    this.movePlayer(deltaTime);
    this.updateObstacles(deltaTime);
    
    this.renderer.render(this.scene, this.camera);
    
    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new CubeRunner();
});
