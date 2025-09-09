import { type GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    start: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        
        this.logo = this.add.image(512, 300, 'logo').setDepth(100);
        
        const currentLevel: number = this.registry.get('currentLevel');
        this.title = this.add.text(512, 460, `Current Level: ${currentLevel}`, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.start = this.add.text(512, 512, `Start Game`, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive()
            .on("pointerover", () => {
                this.start.setStroke('gray', 8);
            })
            .on("pointerout", () => {
                this.start.setStroke('black', 8);
            })
            .on("pointerup", () => {
                this.startGame();
            });

        EventBus.emit('current-scene-ready', this);
    }
    
    startGame ()
    {
        this.scene.start('Game');
    }
}
