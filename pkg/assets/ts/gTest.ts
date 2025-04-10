declare namespace THREE {
  class Scene {
    background: Color;
    add(object: Object3D): this;
    remove(object: Object3D): this;
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
    setPixelRatio(ratio: number): void;
    shadowMap: {
      enabled: boolean;
      type: number;
    };
  }
  
  class Color {
    constructor(color: number | string);
    constructor(r: number, g: number, b: number);
    r: number;
    g: number;
    b: number;
    set(color: string | number): this;
    setRGB(r: number, g: number, b: number): this;
  }
  
  class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
    copy(v: Vector3): this;
    multiplyScalar(scalar: number): this;
    setScalar(scalar: number): this;
    equals(v: Vector3): boolean;
    lerp(v: Vector3, alpha: number): this;
    normalize(): this;
  }
  
  class Euler {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }
  
  class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    children: Object3D[];
    castShadow: boolean;
    receiveShadow: boolean;
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
    material: Material | Material[];
    castShadow: boolean;
    receiveShadow: boolean;
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
    clone(): BufferGeometry;
  }
  
  class BufferAttribute {
    count: number;
    getX(index: number): number;
    getY(index: number): number;
    getZ(index: number): number;
    setX(index: number, x: number): this;
    setY(index: number, y: number): this;
    setZ(index: number, z: number): this;
    needsUpdate: boolean;
  }
  
  class Material {
    constructor();
    side?: number;
    transparent?: boolean;
    opacity?: number;
  }
  
  class MeshStandardMaterial extends Material {
    constructor(parameters?: { 
      color?: number | string | Color; 
      roughness?: number;
      metalness?: number;
      flatShading?: boolean;
      side?: number;
      transparent?: boolean;
      opacity?: number;
    });
    color: Color | number | string;
  }
  
  class MeshBasicMaterial extends Material {
    constructor(parameters?: { 
      color?: number | string | Color; 
      transparent?: boolean; 
      opacity?: number;
      side?: number;
    });
    color: Color | number | string;
    opacity: number;
  }
  
  class ShaderMaterial extends Material {
    constructor(parameters?: { 
      vertexShader: string;
      fragmentShader: string;
      uniforms?: any;
      side?: number;
    });
    uniforms: any;
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
    castShadow: boolean;
    shadow: {
      mapSize: { width: number; height: number };
      camera: {
        near: number;
        far: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
      };
    };
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
  
  const BackSide: number;
  const DoubleSide: number;
  const PCFSoftShadowMap: number;
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
    BOUNDARY_LEFT: -50,
    BOUNDARY_RIGHT: 50,
    GROUND_WIDTH: 150,
    GROUND_LENGTH: 3000,
    MOUNTAIN_COUNT: 40,
    CLOUD_COUNT: 80,
    FLOWER_COUNT: 800,
    BUSH_COUNT: 150,
    TREE_COUNT: 250,
    ROCK_COUNT: 120,
    BIRD_COUNT: 60
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
    GROUND_COLOR: 0x3A4C40,
    PLAYER_COLOR: 0xA9A9A9,
    TREE_TRUNK_COLOR: 0x654321,
    TREE_FOLIAGE_COLORS: [0x2e8b57, 0x3c9065, 0x228b22],
    ROCK_COLOR_BASE: 0xAAAAAA,
    MOUNTAIN_COLORS: [0x8eaabd, 0x6e8a9d, 0x5d798c],
    CLOUD_COLOR: 0xffffff,
    FLOWER_COLORS: [0xff5252, 0xff9800, 0xffeb3b, 0xffffff, 0xe040fb],
    BUSH_COLOR: 0x2e7d32
  });

  export const UI = Object.freeze({
    MESSAGE_DURATION: 2000, 
    HIGH_SCORE_KEY: 'HighScore',
    LEVEL_UP_DURATION: 2000
  });

  export const FX = Object.freeze({
    PARTICLE_COUNT: 20,
    PARTICLE_SIZE: 0.1,
    PARTICLE_LIFETIME: 1000,
    PARTICLE_SPEED: 0.05
  });

  export const CAMERA = Object.freeze({
    HEIGHT: 7,
    DISTANCE: 14,
    LOOK_AHEAD: 8,
    SMOOTHING: 0.05,
    ROTATION_SPEED: 0.1
  });

  export const BIRDS = Object.freeze({
    MIN_HEIGHT: 8,
    MAX_HEIGHT: 25,
    MIN_SPEED: 0.05,
    MAX_SPEED: 0.15,
    WING_FLAP_SPEED: 0.2,
    MAX_WING_ANGLE: Math.PI / 6,
    COLORS: [0x3366ff, 0x22aa22, 0xaa2222, 0xddbb33, 0xb555ff]
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
  public passed: boolean = false; 
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
      case ObstacleType.ROCK_CLUSTER:
        break;
    }
  }
}

class Bird {
  public group: THREE.Group;
  private wingLeft: THREE.Mesh;
  private wingRight: THREE.Mesh;
  private speed: number;
  private direction: THREE.Vector3;
  private flapTime: number = 0;
  private flapSpeed: number;
  private rotationSpeed: number;

  constructor() {
    this.group = new THREE.Group();
    this.speed = GameConfig.BIRDS.MIN_SPEED + 
                Math.random() * (GameConfig.BIRDS.MAX_SPEED - GameConfig.BIRDS.MIN_SPEED);
    
    this.flapSpeed = GameConfig.BIRDS.WING_FLAP_SPEED * (0.8 + Math.random() * 0.4);
    this.rotationSpeed = 0.01 + Math.random() * 0.02;

    const angle = Math.random() * Math.PI * 2;
    this.direction = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();

    const birdColor = GameConfig.BIRDS.COLORS[
      Math.floor(Math.random() * GameConfig.BIRDS.COLORS.length)
    ];
    
    const bodyGeometry = new THREE.ConeGeometry(0.3, 1, 5);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: birdColor,
      roughness: 0.8
    });
    
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2;
    body.castShadow = true;
    this.group.add(body);
    
    const headGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: birdColor,
      roughness: 0.5
    });
    
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.z = 0.45;
    head.position.y = 0.1;
    head.castShadow = true;
    this.group.add(head);
    
    const beakGeometry = new THREE.ConeGeometry(0.05, 0.2, 4);
    const beakMaterial = new THREE.MeshStandardMaterial({
      color: 0xffcc00,
      roughness: 0.5
    });
    
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.z = 0.65;
    beak.position.y = 0.1;
    beak.rotation.x = -Math.PI / 2;
    this.group.add(beak);
    
    const wingGeometry = new THREE.PlaneGeometry(0.8, 0.5);
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: birdColor,
      roughness: 0.8,
      side: THREE.DoubleSide
    });
    
    this.wingLeft = new THREE.Mesh(wingGeometry, wingMaterial);
    this.wingLeft.position.set(-0.4, 0.1, 0);
    this.wingLeft.rotation.z = Math.PI / 6;
    this.wingLeft.castShadow = true;
    this.group.add(this.wingLeft);
    
    this.wingRight = new THREE.Mesh(wingGeometry, wingMaterial);
    this.wingRight.position.set(0.4, 0.1, 0);
    this.wingRight.rotation.z = -Math.PI / 6;
    this.wingRight.castShadow = true;
    this.group.add(this.wingRight);
    
    const height = GameConfig.BIRDS.MIN_HEIGHT + 
                  Math.random() * (GameConfig.BIRDS.MAX_HEIGHT - GameConfig.BIRDS.MIN_HEIGHT);
    
    const worldSize = Math.max(GameConfig.WORLD.GROUND_WIDTH, GameConfig.WORLD.GROUND_LENGTH);
    const randomX = (Math.random() * worldSize) - (worldSize / 2);
    const randomZ = (Math.random() * -worldSize) + (worldSize / 10);
    
    this.group.position.set(randomX, height, randomZ);
    this.group.rotation.y = Math.random() * Math.PI * 2;
  }
  
  update(deltaTime: number): void {
    this.flapTime += deltaTime * this.flapSpeed;
    const wingAngle = Math.sin(this.flapTime) * GameConfig.BIRDS.MAX_WING_ANGLE;
    
    this.wingLeft.rotation.z = Math.PI / 6 + wingAngle;
    this.wingRight.rotation.z = -Math.PI / 6 - wingAngle;
    
    this.group.position.x += this.direction.x * this.speed * deltaTime;
    this.group.position.z += this.direction.z * this.speed * deltaTime;
    
    this.group.rotation.y += (Math.sin(this.flapTime * 0.5) * this.rotationSpeed) * deltaTime;
    
    const margin = 20;
    const worldHalfWidth = GameConfig.WORLD.GROUND_WIDTH / 2 + margin;
    const worldHalfLength = GameConfig.WORLD.GROUND_LENGTH / 2 + margin;
    
    if (this.group.position.x > worldHalfWidth) {
      this.group.position.x = -worldHalfWidth;
    } else if (this.group.position.x < -worldHalfWidth) {
      this.group.position.x = worldHalfWidth;
    }
    
    if (this.group.position.z > margin) {
      this.group.position.z = -worldHalfLength;
    } else if (this.group.position.z < -worldHalfLength) {
      this.group.position.z = margin;
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
  private mountains: THREE.Object3D[] = [];
  private clouds: THREE.Object3D[] = [];
  private skybox!: THREE.Object3D;
  private particles: Particle[] = [];
  private birds: Bird[] = [];
  
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
  private isTouchDevice: boolean = false;
  private mobileControls: {
    left: boolean;
    right: boolean;
    jump: boolean;
    forward: boolean;  
    backward: boolean; 
  } = {
    left: false,
    right: false,
    jump: false,
    forward: false, 
    backward: false 
  };

  private cameraTargetPosition = new THREE.Vector3();
  private cameraTargetLookAt = new THREE.Vector3();
  private playerTargetRotation = Math.PI;
  
  constructor() {
    this.initGame();
  }

  private initGame(): void {
    this.isTouchDevice = this.detectTouchDevice();
    this.initScene();
    this.initSkybox();
    this.initMountains();
    this.initClouds();
    this.initGround();
    this.initLights();
    this.initPlayer();
    this.initEventListeners();
    this.createObstacles();
    this.setupMobileControls();
    this.initEnvironment();
    this.initBirds();
    this.gameLoop(0);
  }
  
  private detectTouchDevice(): boolean {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       ((navigator as any).msMaxTouchPoints > 0));
  }
  
  private initScene(): void {
    this.scene = new THREE.Scene();
    
    const topColor = new THREE.Color(0x0077ff);
    const bottomColor = new THREE.Color(0xffffff);
    
    const vertexShader = `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    
    const fragmentShader = `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + offset).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `;
    
    const uniforms = {
      topColor: { value: topColor },
      bottomColor: { value: bottomColor },
      offset: { value: 400 },
      exponent: { value: 0.6 }
    };
    
    const skyGeo = new THREE.SphereGeometry(400, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.BackSide
    });
    
    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);
    
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 2, -10);
    
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  
  private initSkybox(): void {
    const sunGeometry = new THREE.SphereGeometry(30, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffcc,
      transparent: true,
      opacity: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-100, 100, -200);
    this.scene.add(sun);
    
    const sunGlowGeometry = new THREE.SphereGeometry(35, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffddaa, 
      transparent: true, 
      opacity: 0.4
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    sun.add(sunGlow);
  }
  
  private initMountains(): void {
    for (let i = 0; i < GameConfig.WORLD.MOUNTAIN_COUNT; i++) {
      const mountainGroup = new THREE.Group();
      
      const peakCount = 3 + Math.floor(Math.random() * 4);
      
      for (let p = 0; p < peakCount; p++) {
        const height = 15 + Math.random() * 35;
        const radius = 8 + Math.random() * 12;
        
        const mountainGeometry = new THREE.ConeGeometry(radius, height, 8);
        const mountainColor = GameConfig.VISUALS.MOUNTAIN_COLORS[
          Math.floor(Math.random() * GameConfig.VISUALS.MOUNTAIN_COLORS.length)
        ];
        
        const mountainMaterial = new THREE.MeshStandardMaterial({
          color: mountainColor,
          flatShading: true,
          roughness: 0.9
        });
        
        const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
        
        const offsetX = (Math.random() - 0.5) * 15;
        const offsetZ = (Math.random() - 0.5) * 15;
        mountain.position.set(offsetX, height / 2, offsetZ);
        
        if (height > 30) {
          const snowCapGeometry = new THREE.ConeGeometry(radius * 0.4, height * 0.15, 8);
          const snowMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5
          });
          const snowCap = new THREE.Mesh(snowCapGeometry, snowMaterial);
          snowCap.position.y = height * 0.4;
          mountain.add(snowCap);
        }
        
        if (mountainGeometry.attributes.position) {
          const positions = mountainGeometry.attributes.position;
          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = positions.getZ(i);
            
            if (y < height * 0.9 && y > 0) {
              positions.setX(i, x + (Math.random() - 0.5) * 2);
              positions.setZ(i, z + (Math.random() - 0.5) * 2);
            }
          }
          positions.needsUpdate = true;
        }
        
        mountainGroup.add(mountain);
      }
      
      const angle = (i / GameConfig.WORLD.MOUNTAIN_COUNT) * Math.PI * 2;
      const minDistance = 120;
      const maxDistance = 200;
      const distance = minDistance + Math.random() * (maxDistance - minDistance);
      mountainGroup.position.x = Math.cos(angle) * distance;
      mountainGroup.position.y = 0;
      mountainGroup.position.z = Math.sin(angle) * distance - 100;
      
      this.mountains.push(mountainGroup);
      this.scene.add(mountainGroup);
    }
  }
  
  private initClouds(): void {
    for (let i = 0; i < GameConfig.WORLD.CLOUD_COUNT; i++) {
      const cloudGroup = new THREE.Group();
      
      const puffCount = 3 + Math.floor(Math.random() * 5);
      
      for (let p = 0; p < puffCount; p++) {
        const size = 1.5 + Math.random() * 3;
        
        const cloudPuffGeometry = new THREE.SphereGeometry(size, 8, 8);
        const cloudMaterial = new THREE.MeshStandardMaterial({
          color: GameConfig.VISUALS.CLOUD_COLOR,
          roughness: 0.7,
          metalness: 0,
          transparent: true,
          opacity: 0.9
        });
        
        const cloudPuff = new THREE.Mesh(cloudPuffGeometry, cloudMaterial);
        
        const offsetX = (Math.random() - 0.5) * 5;
        const offsetY = (Math.random() - 0.5) * 2;
        const offsetZ = (Math.random() - 0.5) * 5;
        cloudPuff.position.set(offsetX, offsetY, offsetZ);
        
        cloudGroup.add(cloudPuff);
      }
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 70;
      const height = 20 + Math.random() * 30;
      
      cloudGroup.position.x = Math.cos(angle) * distance;
      cloudGroup.position.y = height;
      cloudGroup.position.z = Math.sin(angle) * distance - 50;
      
      (cloudGroup as any).speed = 0.01 + Math.random() * 0.02;
      
      this.clouds.push(cloudGroup);
      this.scene.add(cloudGroup);
    }
  }
  
  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-10, 30, 10);
    directionalLight.castShadow = true;
    
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    
    const shadowSize = 30;
    directionalLight.shadow.camera.left = -shadowSize;
    directionalLight.shadow.camera.right = shadowSize;
    directionalLight.shadow.camera.top = shadowSize;
    directionalLight.shadow.camera.bottom = -shadowSize;
    
    this.scene.add(directionalLight);
    
    const backLight = new THREE.DirectionalLight(0x4477ff, 0.4);
    backLight.position.set(10, 10, -10);
    this.scene.add(backLight);
  }
  
  private initGround(): void {
    const groundGeometry = new THREE.PlaneGeometry(
      GameConfig.WORLD.GROUND_WIDTH, 
      GameConfig.WORLD.GROUND_LENGTH
    );
    
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: GameConfig.VISUALS.GROUND_COLOR,
      roughness: 0.8,
      metalness: 0.1,
    });
    
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.z = -GameConfig.WORLD.GROUND_LENGTH / 2;
    this.ground.receiveShadow = true;
    
    this.scene.add(this.ground);
    
    this.addGrassDetails();
    this.addFlowers();
    this.addBushes();
    this.addPathDetails();
  }
  
  private addGrassDetails(): void {
    const GRASS_COUNT = 2000;
    const GRASS_COLORS = [0x3e8948, 0x579b42, 0x69aa5c];
    const GRASS_Y_OFFSET = 0.01;
    
    for (let i = 0; i < GRASS_COUNT; i++) {
      const x = Math.random() * GameConfig.WORLD.GROUND_WIDTH - (GameConfig.WORLD.GROUND_WIDTH / 2);
      const z = Math.random() * GameConfig.WORLD.GROUND_LENGTH - GameConfig.WORLD.GROUND_LENGTH; 
      
      const grassPatchGeometry = new THREE.PlaneGeometry(0.8 + Math.random() * 1.2, 0.8 + Math.random() * 1.2);
      const grassPatchMaterial = new THREE.MeshStandardMaterial({ 
        color: GRASS_COLORS[Math.floor(Math.random() * GRASS_COLORS.length)],
        roughness: 1,
        side: THREE.DoubleSide
      });
      
      const grassPatch = new THREE.Mesh(grassPatchGeometry, grassPatchMaterial);
      grassPatch.rotation.x = -Math.PI / 2;
      grassPatch.position.set(x, GRASS_Y_OFFSET, z);
      
      if (Math.random() > 0.7) {
        const crossGrass = new THREE.Mesh(grassPatchGeometry.clone(), grassPatchMaterial);
        crossGrass.rotation.x = -Math.PI / 2;
        crossGrass.rotation.z = Math.PI / 2;
        crossGrass.position.copy(grassPatch.position);
        this.ground.add(crossGrass);
      }
      
      this.ground.add(grassPatch);
    }
  }
  
  private addFlowers(): void {
    for (let i = 0; i < GameConfig.WORLD.FLOWER_COUNT; i++) {
      const flowerGroup = new THREE.Group();
      
      const stemGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8);
      const stemMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x38761d,
        roughness: 0.8
      });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 0.15;
      stem.castShadow = true;
      flowerGroup.add(stem);
      
      const flowerColor = GameConfig.VISUALS.FLOWER_COLORS[
        Math.floor(Math.random() * GameConfig.VISUALS.FLOWER_COLORS.length)
      ];
      
      let flowerHead;
      
      if (Math.random() > 0.5) {
        const petalCount = 5 + Math.floor(Math.random() * 6);
        const flowerHeadGroup = new THREE.Group();
        
        for (let p = 0; p < petalCount; p++) {
          const petalGeometry = new THREE.SphereGeometry(0.07, 8, 8);
          const petalMaterial = new THREE.MeshStandardMaterial({
            color: flowerColor,
            roughness: 0.5
          });
          
          const petal = new THREE.Mesh(petalGeometry, petalMaterial);
          const angle = (p / petalCount) * Math.PI * 2;
          petal.position.x = Math.cos(angle) * 0.1;
          petal.position.z = Math.sin(angle) * 0.1;
          flowerHeadGroup.add(petal);
        }
        
        const centerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const centerMaterial = new THREE.MeshStandardMaterial({
          color: 0xffff00,
          roughness: 0.5
        });
        const center = new THREE.Mesh(centerGeometry, centerMaterial);
        flowerHeadGroup.add(center);
        
        flowerHead = flowerHeadGroup;
      } else {
        const flowerHeadGeometry = new THREE.ConeGeometry(0.1, 0.1, 8);
        const flowerHeadMaterial = new THREE.MeshStandardMaterial({
          color: flowerColor,
          roughness: 0.5
        });
        flowerHead = new THREE.Mesh(flowerHeadGeometry, flowerHeadMaterial);
      }
      
      flowerHead.position.y = 0.3;
      flowerHead.castShadow = true;
      flowerGroup.add(flowerHead);
      
      const x = Math.random() * (GameConfig.WORLD.GROUND_WIDTH - 4) - ((GameConfig.WORLD.GROUND_WIDTH - 4) / 2);
      const z = -Math.random() * (GameConfig.WORLD.GROUND_LENGTH - 10);
      flowerGroup.position.set(x, 0, z);
      
      this.ground.add(flowerGroup);
    }
  }
  
  private addBushes(): void {
    for (let i = 0; i < GameConfig.WORLD.BUSH_COUNT; i++) {
      const bushGroup = new THREE.Group();
      
      const clusterCount = 3 + Math.floor(Math.random() * 4);
      const bushSize = 0.5 + Math.random() * 0.8;
      
      for (let c = 0; c < clusterCount; c++) {
        const sphereSize = bushSize * (0.6 + Math.random() * 0.4);
        const sphereGeometry = new THREE.SphereGeometry(sphereSize, 8, 8);
        
        const colorVariance = 0.1 * Math.random() - 0.05;
        const colorHex = GameConfig.VISUALS.BUSH_COLOR;
        const color = new THREE.Color(colorHex);
        
        color.r += colorVariance;
        color.g += colorVariance;
        color.b += colorVariance;
        
        const bushMaterial = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.8
        });
        
        const bushPart = new THREE.Mesh(sphereGeometry, bushMaterial);
        
        bushPart.position.x = (Math.random() - 0.5) * bushSize;
        bushPart.position.y = sphereSize * 0.8;
        bushPart.position.z = (Math.random() - 0.5) * bushSize;
        
        bushPart.castShadow = true;
        bushGroup.add(bushPart);
      }
      
      const edgeOffset = GameConfig.WORLD.GROUND_WIDTH / 5;
      const x = Math.random() > 0.5 ? 
        -GameConfig.WORLD.GROUND_WIDTH / 2 + Math.random() * edgeOffset : 
        GameConfig.WORLD.GROUND_WIDTH / 2 - Math.random() * edgeOffset;
      const z = -Math.random() * (GameConfig.WORLD.GROUND_LENGTH - 10);
      bushGroup.position.set(x, 0, z);
      
      this.ground.add(bushGroup);
    }
  }
  
  private addPathDetails(): void {
    for (let i = 0; i < 100; i++) {
      const rockSize = 0.1 + Math.random() * 0.2;
      const rockGeometry = new THREE.SphereGeometry(rockSize, 6, 6);
      const rockMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        roughness: 0.9
      });
      
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      
      const side = Math.random() > 0.5 ? -1 : 1;
      const edgePosition = side * (6 + Math.random() * 1.5);
      const z = Math.random() * 180 - 190;
      
      rock.position.set(edgePosition, rockSize / 2, z);
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      rock.castShadow = true;
      rock.receiveShadow = true;
      
      this.ground.add(rock);
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
    
    catGroup.rotation.y = Math.PI; 
    catGroup.position.y = GameConfig.PLAYER.START_Y - 0.4; 
    catGroup.position.z = GameConfig.PLAYER.START_Z;
    
    this.player = catGroup as unknown as THREE.Mesh;
    this.scene.add(catGroup);
    
    const castShadowOnMesh = (obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
      obj.children.forEach(castShadowOnMesh);
    };
    
    castShadowOnMesh(this.player);
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
  
  private setupMobileControls(): void {
    const mobileControlsElement = document.getElementById('mobile-controls');
    if (mobileControlsElement) {
      if (this.isTouchDevice) {
        mobileControlsElement.classList.remove('hidden');
        
        const leftButton = document.getElementById('mobile-left');
        const rightButton = document.getElementById('mobile-right');
        const jumpButton = document.getElementById('mobile-jump');
        const forwardButton = document.getElementById('mobile-forward');  
        const backwardButton = document.getElementById('mobile-backward');  
        
        if (leftButton) {
          leftButton.addEventListener('touchstart', () => { this.mobileControls.left = true; });
          leftButton.addEventListener('touchend', () => { this.mobileControls.left = false; });
        }
        
        if (rightButton) {
          rightButton.addEventListener('touchstart', () => { this.mobileControls.right = true; });
          rightButton.addEventListener('touchend', () => { this.mobileControls.right = false; });
        }
        
        if (jumpButton) {
          jumpButton.addEventListener('touchstart', () => { this.mobileControls.jump = true; });
          jumpButton.addEventListener('touchend', () => { this.mobileControls.jump = false; });
        }
        
        if (forwardButton) {
          forwardButton.addEventListener('touchstart', () => { this.mobileControls.forward = true; });
          forwardButton.addEventListener('touchend', () => { this.mobileControls.forward = false; });
        }
        
        if (backwardButton) {
          backwardButton.addEventListener('touchstart', () => { this.mobileControls.backward = true; });
          backwardButton.addEventListener('touchend', () => { this.mobileControls.backward = false; });
        }
      }
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
  
  private createParticles(position: THREE.Vector3, color: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const particle = new Particle(position, color);
      this.particles.push(particle);
      this.scene.add(particle.mesh);
    }
  }
  
  private updateParticles(deltaTime: number): void {
    this.particles = this.particles.filter(particle => {
      const alive = particle.update(deltaTime);
      if (!alive) {
        this.scene.remove(particle.mesh);
      }
      return alive;
    });
  }
  
  private showLevelUpNotification(): void {
    const notification = document.getElementById('level-up-notification');
    if (notification) {
      notification.classList.remove('hidden');
      notification.classList.add('visible');
      
      setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
          notification.classList.add('hidden');
        }, 500);
      }, GameConfig.UI.LEVEL_UP_DURATION);
    }
  }
  
  private updateClouds(deltaTime: number): void {
    this.clouds.forEach(cloud => {
      cloud.position.x += (cloud as any).speed * deltaTime;
      
      if (cloud.position.x > 100) {
        cloud.position.x = -100;
      }
    });
  }
  
  private movePlayer(deltaTime: number): void {
    const movementSpeed = GameConfig.PLAYER.SPEED * deltaTime;
    const currentTime = performance.now();
    const timeSinceLastJump = currentTime - this.gameState.lastJumpTime;
    
    let isMoving = false;
    
    if ((this.keys['ArrowLeft'] || this.keys['a'] || this.mobileControls.left) && 
        this.player.position.x > GameConfig.WORLD.BOUNDARY_LEFT) {
      this.player.position.x -= movementSpeed;
      this.playerTargetRotation = Math.PI + Math.PI / 4;
      isMoving = true;
    } else if ((this.keys['ArrowRight'] || this.keys['d'] || this.mobileControls.right) && 
        this.player.position.x < GameConfig.WORLD.BOUNDARY_RIGHT) {
      this.player.position.x += movementSpeed;
      this.playerTargetRotation = Math.PI - Math.PI / 4;
      isMoving = true;
    } else if ((this.keys['ArrowUp'] || this.keys['w'] || this.mobileControls.forward)) {
      this.playerTargetRotation = Math.PI;
    } else if ((this.keys['ArrowDown'] || this.keys['s'] || this.mobileControls.backward)) {
      this.playerTargetRotation = 0;
    }
    
    this.player.rotation.y += (this.playerTargetRotation - this.player.rotation.y) * 0.1;
    
    if ((this.keys['ArrowUp'] || this.keys['w'] || this.mobileControls.forward)) {
      const forwardLimit = -GameConfig.WORLD.GROUND_LENGTH + 20;
      if (this.player.position.z > forwardLimit) {
        this.player.position.z -= movementSpeed * 1.2;
        isMoving = true;
      }
    }
    
    if ((this.keys['ArrowDown'] || this.keys['s'] || this.mobileControls.backward)) {
      const backwardLimit = 5;
      if (this.player.position.z < backwardLimit) {
        this.player.position.z += movementSpeed * 1.2;
        isMoving = true;
      }
    }
    
    if (isMoving && !this.gameState.playerJumping && this.player.position.y <= GameConfig.PLAYER.START_Y + 0.1) {
      const bobHeight = Math.sin(performance.now() * 0.015) * 0.05;
      this.player.position.y = GameConfig.PLAYER.START_Y + bobHeight;
    }
    
    const canJump = !this.gameState.playerJumping && 
                   this.player.position.y <= GameConfig.PLAYER.START_Y + 0.1 &&
                   timeSinceLastJump > GameConfig.PLAYER.JUMP_COOLDOWN;
    
    if ((this.keys[' '] || this.mobileControls.jump) && canJump) {
      this.jumpVelocity = GameConfig.PHYSICS.JUMP_FORCE;
      this.gameState.playerJumping = true;
      this.gameState.lastJumpTime = currentTime;
      this.mobileControls.jump = false; 
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
    
    if (this.gameState.playerJumping && this.jumpVelocity > 0) {
      if (Math.random() > 0.7) {
        this.createParticles(
          new THREE.Vector3(
            this.player.position.x,
            this.player.position.y - 0.5,
            this.player.position.z
          ),
          0xeeeeee,
          3
        );
      }
    }
    
    if (this.player.position.y <= GameConfig.PLAYER.START_Y && this.jumpVelocity < -0.1) {
      this.createParticles(
        new THREE.Vector3(
          this.player.position.x,
          GameConfig.PLAYER.START_Y,
          this.player.position.z
        ),
        0xcccccc,
        10
      );
    }
  }
  
  private updateObstacles(deltaTime: number): void {
    this.obstacles.forEach(obstacle => {
      obstacle.update(deltaTime);
      
      const distanceToPlayer = obstacle.mesh.position.z - this.player.position.z;
      
      if (distanceToPlayer > 0 && !obstacle.passed && distanceToPlayer < 5) {
        obstacle.passed = true;
        this.gameState.score += GameConfig.OBSTACLES.POINTS_PER_OBSTACLE;
        this.updateScore();
        
        if (this.gameState.score % GameConfig.OBSTACLES.SPEED_INCREASE_THRESHOLD === 0) {
          this.gameState.speed += GameConfig.OBSTACLES.SPEED_INCREMENT;
          this.showLevelUpNotification();
          
          this.createParticles(
            new THREE.Vector3(
              this.player.position.x,
              this.player.position.y + 1,
              this.player.position.z
            ),
            0xffdd00,
            15
          );
        }
      }
      
      if (this.checkCollision(this.player, obstacle.mesh)) {
        this.createParticles(
          new THREE.Vector3(
            this.player.position.x,
            this.player.position.y,
            this.player.position.z
          ),
          0xff5252,
          20
        );
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
      scoreElement.classList.add('score-updated');
      
      setTimeout(() => {
        scoreElement.classList.remove('score-updated');
      }, 600);
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
      obstacle.passed = false;
      obstacle.mesh.position.z = -(Math.random() * GameConfig.OBSTACLES.ZONE_MAX + GameConfig.OBSTACLES.ZONE_MIN);
      obstacle.mesh.position.x = Math.random() * 16 - 8;
      obstacle.baseX = obstacle.mesh.position.x;
    });
    
    this.mobileControls = {
      left: false,
      right: false,
      jump: false,
      forward: false,
      backward: false
    };
    
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
    this.updateParticles(deltaTime);
    this.updateClouds(deltaTime);
    this.updateBirds(deltaTime);
    this.updateCamera();
    
    this.renderer.render(this.scene, this.camera);
    
    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  private updateCamera(): void {
    const angle = this.player.rotation.y;
    
    const offsetX = Math.sin(angle) * -GameConfig.CAMERA.DISTANCE;
    const offsetZ = Math.cos(angle) * -GameConfig.CAMERA.DISTANCE;
    
    const idealPosition = new THREE.Vector3(
      this.player.position.x + offsetX,
      this.player.position.y + GameConfig.CAMERA.HEIGHT,
      this.player.position.z + offsetZ
    );
    
    const lookAheadX = Math.sin(angle) * GameConfig.CAMERA.LOOK_AHEAD;
    const lookAheadZ = Math.cos(angle) * GameConfig.CAMERA.LOOK_AHEAD;
    
    const idealLookAt = new THREE.Vector3(
      this.player.position.x + lookAheadX,
      this.player.position.y + 1,
      this.player.position.z + lookAheadZ
    );
    
    if (!this.cameraTargetPosition.equals(new THREE.Vector3(0, 0, 0))) {
      this.cameraTargetPosition.lerp(idealPosition, GameConfig.CAMERA.SMOOTHING);
      this.cameraTargetLookAt.lerp(idealLookAt, GameConfig.CAMERA.SMOOTHING);
    } else {
      this.cameraTargetPosition.copy(idealPosition);
      this.cameraTargetLookAt.copy(idealLookAt);
    }
    
    this.camera.position.copy(this.cameraTargetPosition);
    this.camera.lookAt(this.cameraTargetLookAt);
  }

  private initEnvironment(): void {
    this.addStandaloneTrees();
    this.addStandaloneRocks();
  }

  private addStandaloneTrees(): void {
    for (let i = 0; i < GameConfig.WORLD.TREE_COUNT; i++) {
      const isLarge = Math.random() > 0.6;
      const tree = this.createTree(isLarge);
      
      const x = Math.random() * (GameConfig.WORLD.GROUND_WIDTH - 10) - ((GameConfig.WORLD.GROUND_WIDTH - 10) / 2);
      const z = -Math.random() * (GameConfig.WORLD.GROUND_LENGTH - 20);
      
      if (Math.abs(x) < 5) {
        continue;
      }
      
      tree.position.set(x, 0, z);
      this.scene.add(tree);
    }
  }

  private addStandaloneRocks(): void {
    for (let i = 0; i < GameConfig.WORLD.ROCK_COUNT; i++) {
      const isCluster = Math.random() > 0.7;
      const rock = this.createRock(isCluster);
      
      const x = Math.random() * (GameConfig.WORLD.GROUND_WIDTH - 5) - ((GameConfig.WORLD.GROUND_WIDTH - 5) / 2);
      const z = -Math.random() * (GameConfig.WORLD.GROUND_LENGTH - 10);
      
      rock.position.set(x, 0, z);
      this.scene.add(rock);
    }
  }

  private initBirds(): void {
    for (let i = 0; i < GameConfig.WORLD.BIRD_COUNT; i++) {
      const bird = new Bird();
      this.birds.push(bird);
      this.scene.add(bird.group);
    }
  }

  private updateBirds(deltaTime: number): void {
    this.birds.forEach(bird => {
      bird.update(deltaTime);
    });
  }
}

class Particle {
  public mesh: THREE.Mesh;
  private velocity: THREE.Vector3;
  private lifetime: number;
  private birthTime: number;
  
  constructor(position: THREE.Vector3, color: number) {
    const size = GameConfig.FX.PARTICLE_SIZE * (0.5 + Math.random());
    const geometry = new THREE.SphereGeometry(size, 4, 4);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = GameConfig.FX.PARTICLE_SPEED * (0.5 + Math.random());
    this.velocity = new THREE.Vector3(
      Math.cos(angle) * speed,
      0.5 + Math.random() * speed * 2,
      Math.sin(angle) * speed
    );
    
    this.lifetime = GameConfig.FX.PARTICLE_LIFETIME * (0.8 + Math.random() * 0.4);
    this.birthTime = performance.now();
  }
  
  public update(deltaTime: number): boolean {
    const age = performance.now() - this.birthTime;
    
    if (age > this.lifetime) {
      return false;
    }
    
    this.mesh.position.x += this.velocity.x * deltaTime;
    this.mesh.position.y += this.velocity.y * deltaTime;
    this.mesh.position.z += this.velocity.z * deltaTime;
    
    this.velocity.y -= 0.01 * deltaTime;
    this.velocity.multiplyScalar(0.98);
    
    const lifeRatio = 1 - (age / this.lifetime);
    const material = this.mesh.material as THREE.MeshBasicMaterial;
    material.opacity = lifeRatio * 0.8;
    
    this.mesh.scale.setScalar(lifeRatio);
    
    return true;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new CubeRunner();
});
