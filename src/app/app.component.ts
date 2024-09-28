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
			commentElement.setPinCursorImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGQ9Ik0xNiAyOS41SDNDMi43MjM4NiAyOS41IDIuNSAyOS4yNzYxIDIuNSAyOVYxNkMyLjUgOC41NDQxNiA4LjU0NDE2IDIuNSAxNiAyLjVDMjMuNDU1OCAyLjUgMjkuNSA4LjU0NDE2IDI5LjUgMTZDMjkuNSAyMy40NTU4IDIzLjQ1NTggMjkuNSAxNiAyOS41WiIgZmlsbD0iIzNCOTVGRiIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L3N2Zz4=');

			commentElement?.onCommentModeChange().subscribe((mode) => {
				this.showSidebar = mode;
			});

			commentElement.onCommentSelectionChange().subscribe((comment) => {
				this.showSidebar = comment?.selected ?? true;
			});
		}

	}

}	
