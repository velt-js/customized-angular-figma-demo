import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initVelt } from '@veltdev/client';
import { User, Velt } from '@veltdev/types';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, SidebarComponent, ToolbarComponent, NgIf],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
	title = 'figma';

	client!: Velt;
	showSidebar: boolean = false;

	user: User = {
		userId: '123',
		email: 'test@test.com',
		color: '#0DCF82',
		textColor: '#FFFFFF',
	};

	constructor() {
		this.initializeVelt();
	}

	private async initializeVelt() {
		this.client = await initVelt('AN5s6iaYIuLLXul0X4zf');
		this.client.identify(this.user);

		if (this.client) {
			this.client.setDocument('custom-figma', { documentName: 'custom-figma' });
			this.client.setDarkMode(true);


			const commentElement = this.client.getCommentElement();
			commentElement.disableCommentPinHighlighter();

			commentElement?.onCommentModeChange().subscribe((mode) => {
				this.showSidebar = mode;
			});

			commentElement.onCommentSelectionChange().subscribe((comment) => {
				this.showSidebar = comment?.selected ?? true;
			});
		}

	}

}	
