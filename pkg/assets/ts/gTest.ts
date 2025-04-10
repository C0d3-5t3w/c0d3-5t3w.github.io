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
    constructor(r: number, g: number, b: number);  
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
    scale: Vector3; 
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
    attributes: {
      position: BufferAttribute;
    };
  }
  
  class BufferAttribute {
    count: number;
    getX(index: number): number;
    getY(index: number): number;
    getZ(index: number): number;
    setX(index: number, x: number): this;
    setY(index: number, y: number): this;
    setZ(index: number, z: number): this;
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
  
  class Group extends Object3D {
    constructor();
  }
  
  class SphereGeometry extends BufferGeometry {
    constructor(radius: number, widthSegments?: number, heightSegments?: number);
  }
  
  class CylinderGeometry extends BufferGeometry {
    constructor(
      radiusTop?: number,
      radiusBottom?: number,
      height?: number,
      radialSegments?: number,
      heightSegments?: number
    );
  }
  
  class ConeGeometry extends BufferGeometry {
    constructor(radius?: number, height?: number, radialSegments?: number);
  }
}

namespace GameConfig {
  export const PHYSICS = Object.freeze({
    GRAVITY: 0.01,
    JUMP_FORCE: 0.3,
    FRICTION: 0.98,
    AIR_RESISTANCE: 0.995
  });

  export const PLAYER = Object.freeze({
    SPEED: 0.2,
    SIZE: 1.0,
    START_Y: 0.5,
    START_Z: 0,
    JUMP_COOLDOWN: 500, 
    MAX_LIVES: 3
  });

  export const WORLD = Object.freeze({
    BOUNDARY_LEFT: -8,
    BOUNDARY_RIGHT: 8,
    GROUND_WIDTH: 20,
    GROUND_LENGTH: 1000
  });

  export const OBSTACLES = Object.freeze({
    COUNT: 20,
    ZONE_MIN: 20,
    ZONE_MAX: 200,
    BASE_SPEED: 0.2,
    SPEED_INCREMENT: 0.05,
    POINTS_PER_OBSTACLE: 10,
    SPEED_INCREASE_THRESHOLD: 100
  });

  export const VISUALS = Object.freeze({
    SKY_COLOR: 0x87CEEB,
    GROUND_COLOR: 0x4CAF50,
    PLAYER_COLOR: 0x999999,
    TREE_TRUNK_COLOR: 0x8B4513,
    TREE_FOLIAGE_COLORS: [0x2e8b57, 0x228b22],
    ROCK_COLOR_BASE: 0xAAAAAA
  });

  export const UI = Object.freeze({
    MESSAGE_DURATION: 2000, 
    HIGH_SCORE_KEY: 'catRunnerHighScore'
  });
}

interface GameState {
  score: number;
  speed: number;
  gameOver: boolean;
  playerJumping: boolean;
  lastJumpTime: number;
}

enum ObstacleType {
  TREE,
  ROCK,
  TALL_TREE,
  ROCK_CLUSTER
}

class Obstacle {
  public mesh: THREE.Object3D;
  public type: ObstacleType;
  public baseX: number = 0;
  public moveDirection: number = 1;
  public rotationSpeed: number = 0;
  private readonly MOVEMENT_SPEED: number = 0.02;
  private readonly ROTATION_MAX: number = 0.01;
  
  constructor(mesh: THREE.Object3D, type: ObstacleType) {
    this.mesh = mesh;
    this.type = type;
    this.baseX = mesh.position.x;
    
    if (type === ObstacleType.TREE || type === ObstacleType.TALL_TREE) {
      this.rotationSpeed = Math.random() * this.ROTATION_MAX;
    }
    
    if (type === ObstacleType.ROCK) {
      this.moveDirection = Math.random() > 0.5 ? 1 : -1;
    }
  }
  
  public update(deltaTime: number): void {
    switch (this.type) {
      case ObstacleType.TREE:
      case ObstacleType.TALL_TREE:
        this.mesh.rotation.z = Math.sin(performance.now() * 0.001) * this.rotationSpeed;
        break;
      case ObstacleType.ROCK:
        this.mesh.position.x += this.moveDirection * this.MOVEMENT_SPEED;
        this.mesh.rotation.z += this.moveDirection * (this.MOVEMENT_SPEED / 2);
        if (Math.abs(this.mesh.position.x - this.baseX) > 1) {
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
    speed: GameConfig.OBSTACLES.BASE_SPEED,
    gameOver: false,
    playerJumping: false,
    lastJumpTime: 0
  };
  
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private jumpVelocity: number = 0;
  
  private keys: { [key: string]: boolean } = {};
  
  constructor() {
    this.initGame();
  }

  private initGame(): void {
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
    this.scene.background = new THREE.Color(GameConfig.VISUALS.SKY_COLOR);
    
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
    const groundGeometry = new THREE.PlaneGeometry(
      GameConfig.WORLD.GROUND_WIDTH, 
      GameConfig.WORLD.GROUND_LENGTH
    );
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: GameConfig.VISUALS.GROUND_COLOR,
      roughness: 0.8,
    });
    
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.z = -500;
    
    this.addGrassDetails();
    
    this.scene.add(this.ground);
  }
  
  private addGrassDetails(): void {
    const GRASS_COUNT = 200;
    const GRASS_COLORS = [0x3e8948, 0x579b42];
    const GRASS_Y_OFFSET = 0.01;
    
    for (let i = 0; i < GRASS_COUNT; i++) {
      const x = Math.random() * 20 - 10;
      const z = Math.random() * 200 - 200;
      
      const grassPatchGeometry = new THREE.PlaneGeometry(1 + Math.random(), 1 + Math.random());
      const grassPatchMaterial = new THREE.MeshStandardMaterial({ 
        color: Math.random() > 0.5 ? GRASS_COLORS[0] : GRASS_COLORS[1],
        roughness: 1
      });
      
      const grassPatch = new THREE.Mesh(grassPatchGeometry, grassPatchMaterial);
      grassPatch.rotation.x = -Math.PI / 2;
      grassPatch.position.set(x, GRASS_Y_OFFSET, z);
      
      this.ground.add(grassPatch);
    }
  }
  
  private initPlayer(): void {
    const catGroup = new THREE.Group();
    
    const bodyGeometry = new THREE.BoxGeometry(0.8, 0.7, 1.2);
    const catGrayMaterial = new THREE.MeshStandardMaterial({ color: GameConfig.VISUALS.PLAYER_COLOR });
    const catBody = new THREE.Mesh(bodyGeometry, catGrayMaterial);
    catBody.position.y = 0.35;
    catGroup.add(catBody);
    
    const headGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: GameConfig.VISUALS.PLAYER_COLOR });
    const catHead = new THREE.Mesh(headGeometry, headMaterial);
    catHead.position.set(0, 0.8, 0.5);
    catGroup.add(catHead);
    
    const earGeometry = new THREE.ConeGeometry(0.2, 0.3, 4);
    const earMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.25, 1.15, 0.5);
    leftEar.rotation.z = -Math.PI / 4;
    catGroup.add(leftEar);
    
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.25, 1.15, 0.5);
    rightEar.rotation.z = Math.PI / 4;
    catGroup.add(rightEar);
    
    const tailGeometry = new THREE.CylinderGeometry(0.1, 0.05, 1, 8);
    const tailMaterial = new THREE.MeshStandardMaterial({ color: GameConfig.VISUALS.PLAYER_COLOR });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0.5, -0.6);
    tail.rotation.x = -Math.PI / 4;
    catGroup.add(tail);
    
    const eyeGeometry = new THREE.SphereGeometry(0.07, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.85, 0.85);
    catGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.85, 0.85);
    catGroup.add(rightEye);
    
    const noseGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xffaabb });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0.7, 0.95);
    catGroup.add(nose);
    
    const createFurTuft = (x: number, y: number, z: number, size: number) => {
      const furGeometry = new THREE.BoxGeometry(size, size, size);
      const furMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xaaaaaa,
        roughness: 0.9
      });
      const furTuft = new THREE.Mesh(furGeometry, furMaterial);
      furTuft.position.set(x, y, z);
      return furTuft;
    };
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x = Math.cos(angle) * 0.55;
      const z = Math.sin(angle) * 0.65;
      catGroup.add(createFurTuft(x, 0.4, z, 0.25 + Math.random() * 0.2));
    }
    
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI;
      const x = Math.cos(angle) * 0.3;
      const z = Math.sin(angle) * 0.3 + 0.5;
      catGroup.add(createFurTuft(x, 1.1, z, 0.15 + Math.random() * 0.1));
    }
    
    catGroup.position.y = GameConfig.PLAYER.START_Y - 0.4; 
    catGroup.position.z = GameConfig.PLAYER.START_Z;
    
    this.player = catGroup as unknown as THREE.Mesh;
    this.scene.add(catGroup);
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
  
  private createTree(isLarge: boolean = false): THREE.Group {
    const treeGroup = new THREE.Group();
    
    const TRUNK_HEIGHT_BASE = isLarge ? 3 : 1;
    const TRUNK_HEIGHT_VARIATION = isLarge ? 2 : 1.5;
    const TRUNK_RADIUS_BASE = isLarge ? 0.3 : 0.2;
    const TRUNK_RADIUS_VARIATION = isLarge ? 0.2 : 0.1;
    const FOLIAGE_LAYERS = isLarge ? 3 : 2;
    
    const trunkHeight = TRUNK_HEIGHT_BASE + Math.random() * TRUNK_HEIGHT_VARIATION;
    const trunkRadius = TRUNK_RADIUS_BASE + Math.random() * TRUNK_RADIUS_VARIATION;
    const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 1.2, trunkHeight, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ 
      color: GameConfig.VISUALS.TREE_TRUNK_COLOR,
      roughness: 0.9
    });
    
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    treeGroup.add(trunk);
    
    const foliageColor = Math.random() > 0.3 
      ? GameConfig.VISUALS.TREE_FOLIAGE_COLORS[0] 
      : GameConfig.VISUALS.TREE_FOLIAGE_COLORS[1];
    
    for (let i = 0; i < FOLIAGE_LAYERS; i++) {
      const layerSize = isLarge ? 2 - (i * 0.4) : 1.2 - (i * 0.3);
      const height = isLarge ? 1.8 : 1.2;
      const foliageGeometry = Math.random() > 0.5 
        ? new THREE.ConeGeometry(layerSize, height, 8) 
        : new THREE.SphereGeometry(layerSize, 8, 6);
      
      const foliageMaterial = new THREE.MeshStandardMaterial({
        color: foliageColor,
        roughness: 0.8
      });
      
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.y = trunkHeight - 0.3 + (i * 0.8);
      treeGroup.add(foliage);
    }
    
    return treeGroup;
  }
  
  private createRock(isCluster: boolean = false): THREE.Group {
    const rockGroup = new THREE.Group();
    
    if (isCluster) {
      const ROCK_COUNT_MIN = 3;
      const ROCK_COUNT_VARIATION = 3;
      const ROCK_SIZE_BASE = 0.4;
      const ROCK_SIZE_VARIATION = 0.6;
      
      const rockCount = ROCK_COUNT_MIN + Math.floor(Math.random() * ROCK_COUNT_VARIATION);
      
      for (let i = 0; i < rockCount; i++) {
        const rockSize = ROCK_SIZE_BASE + Math.random() * ROCK_SIZE_VARIATION;
        let rockGeometry: THREE.BufferGeometry;
        
        const shapeType = Math.floor(Math.random() * 3);
        switch (shapeType) {
          case 0:
            rockGeometry = new THREE.SphereGeometry(rockSize, 6, 4);
            break;
          case 1:
            rockGeometry = new THREE.BoxGeometry(
              rockSize * 1.2, 
              rockSize * 0.8, 
              rockSize
            );
            break;
          default:
            rockGeometry = new THREE.ConeGeometry(rockSize, rockSize * 1.5, 5);
            break;
        }
        
        const grayShade = 0.4 + Math.random() * 0.3;
        const rockMaterial = new THREE.MeshStandardMaterial({
          color: Math.floor(grayShade * 0xFFFFFF),
          roughness: 0.9
        });
        
        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        
        const angle = (i / rockCount) * Math.PI * 2;
        const distance = 0.3 + Math.random() * 0.5;
        rock.position.set(
          Math.cos(angle) * distance,
          rockSize / 2,
          Math.sin(angle) * distance
        );
        
        rock.rotation.x = Math.random() * Math.PI;
        rock.rotation.y = Math.random() * Math.PI;
        rock.rotation.z = Math.random() * Math.PI;
        
        rockGroup.add(rock);
      }
    } else {
      const ROCK_SIZE_BASE = 0.7;
      const ROCK_SIZE_VARIATION = 1.0;
      const SCALE_BASE = 0.8;
      const SCALE_VARIATION = 0.4;
      
      const rockSize = ROCK_SIZE_BASE + Math.random() * ROCK_SIZE_VARIATION;
      const simpleRockGeometry = new THREE.SphereGeometry(rockSize, 7, 5);
      
      const grayShade = 0.3 + Math.random() * 0.3;
      const rockMaterial = new THREE.MeshStandardMaterial({
        color: Math.floor(grayShade * 0xFFFFFF),
        roughness: 0.9
      });
      
      const rock = new THREE.Mesh(simpleRockGeometry, rockMaterial);
      rock.position.y = rockSize / 2;
      
      (rock as any).scale.x = SCALE_BASE + Math.random() * SCALE_VARIATION;
      (rock as any).scale.y = SCALE_BASE + Math.random() * SCALE_VARIATION;
      (rock as any).scale.z = SCALE_BASE + Math.random() * SCALE_VARIATION;
      
      rock.rotation.x = Math.random() * Math.PI;
      rock.rotation.y = Math.random() * Math.PI;
      rock.rotation.z = Math.random() * Math.PI;
      
      rockGroup.add(rock);
    }
    
    return rockGroup;
  }
  
  private createObstacles(): void {
    for (let i = 0; i < GameConfig.OBSTACLES.COUNT; i++) {
      const typeIndex = Math.floor(Math.random() * Object.keys(ObstacleType).length / 2);
      const type = typeIndex as ObstacleType;
      
      let obstacleMesh: THREE.Object3D;
      
      switch (type) {
        case ObstacleType.TREE:
          obstacleMesh = this.createTree(false);
          break;
        case ObstacleType.TALL_TREE:
          obstacleMesh = this.createTree(true);
          break;
        case ObstacleType.ROCK:
          obstacleMesh = this.createRock(false);
          break;
        case ObstacleType.ROCK_CLUSTER:
          obstacleMesh = this.createRock(true);
          break;
      }
      
      obstacleMesh.position.x = Math.random() * 16 - 8;
      obstacleMesh.position.z = -(Math.random() * GameConfig.OBSTACLES.ZONE_MAX + GameConfig.OBSTACLES.ZONE_MIN);
      
      const obstacle = new Obstacle(obstacleMesh, type);
      this.obstacles.push(obstacle);
      this.scene.add(obstacleMesh);
    }
  }
  
  private movePlayer(deltaTime: number): void {
    const movementSpeed = GameConfig.PLAYER.SPEED * deltaTime;
    const currentTime = performance.now();
    const timeSinceLastJump = currentTime - this.gameState.lastJumpTime;
    
    if ((this.keys['ArrowLeft'] || this.keys['a']) && 
        this.player.position.x > GameConfig.WORLD.BOUNDARY_LEFT) {
      this.player.position.x -= movementSpeed;
      this.player.rotation.y = Math.PI / 8;
    }
    if ((this.keys['ArrowRight'] || this.keys['d']) && 
        this.player.position.x < GameConfig.WORLD.BOUNDARY_RIGHT) {
      this.player.position.x += movementSpeed;
      this.player.rotation.y = -Math.PI / 8; 
    }
    
    if (!this.keys['ArrowLeft'] && !this.keys['a'] && !this.keys['ArrowRight'] && !this.keys['d']) {
      this.player.rotation.y = 0;
    }
    
    const canJump = !this.gameState.playerJumping && 
                   this.player.position.y <= GameConfig.PLAYER.START_Y + 0.1 &&
                   timeSinceLastJump > GameConfig.PLAYER.JUMP_COOLDOWN;
    
    if ((this.keys[' '] || this.keys['ArrowUp'] || this.keys['w']) && canJump) {
      this.jumpVelocity = GameConfig.PHYSICS.JUMP_FORCE;
      this.gameState.playerJumping = true;
      this.gameState.lastJumpTime = currentTime;
    }
    
    if (this.gameState.playerJumping || this.player.position.y > GameConfig.PLAYER.START_Y) {
      this.player.position.y += this.jumpVelocity * deltaTime;
      this.jumpVelocity -= GameConfig.PHYSICS.GRAVITY * deltaTime;
      
      if (this.player.position.y <= GameConfig.PLAYER.START_Y && this.jumpVelocity < 0) {
        this.player.position.y = GameConfig.PLAYER.START_Y;
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
        obstacle.mesh.position.z = -(Math.random() * GameConfig.OBSTACLES.ZONE_MAX + GameConfig.OBSTACLES.ZONE_MIN);
        obstacle.mesh.position.x = Math.random() * 16 - 8;
        obstacle.baseX = obstacle.mesh.position.x;
        
        this.gameState.score += GameConfig.OBSTACLES.POINTS_PER_OBSTACLE;
        this.updateScore();
        
        if (this.gameState.score % GameConfig.OBSTACLES.SPEED_INCREASE_THRESHOLD === 0) {
          this.gameState.speed += GameConfig.OBSTACLES.SPEED_INCREMENT;
          this.showMessage(`Speed increased! Current speed: ${this.gameState.speed.toFixed(2)}`);
        }
      }
      
      if (this.checkCollision(this.player, obstacle.mesh)) {
        this.endGame();
      }
    });
  }
  
  private checkCollision(player: THREE.Object3D, obstacle: THREE.Object3D): boolean {
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
    }, GameConfig.UI.MESSAGE_DURATION);
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
    
    const highScore = localStorage.getItem(GameConfig.UI.HIGH_SCORE_KEY) ? 
      parseInt(localStorage.getItem(GameConfig.UI.HIGH_SCORE_KEY)!) : 0;
      
    if (this.gameState.score > highScore) {
      localStorage.setItem(GameConfig.UI.HIGH_SCORE_KEY, this.gameState.score.toString());
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
      speed: GameConfig.OBSTACLES.BASE_SPEED,
      gameOver: false,
      playerJumping: false,
      lastJumpTime: 0
    };
    
    this.jumpVelocity = 0;
    this.updateScore();
    
    const gameOverElement = document.getElementById('game-over');
    if (gameOverElement) {
      gameOverElement.classList.add('hidden');
    }
    
    this.player.position.set(0, GameConfig.PLAYER.START_Y, 0);
    
    this.obstacles.forEach(obstacle => {
      obstacle.mesh.position.z = -(Math.random() * GameConfig.OBSTACLES.ZONE_MAX + GameConfig.OBSTACLES.ZONE_MIN);
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
