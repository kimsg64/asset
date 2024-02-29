"use client";
import * as styles from "@/app/(beforeLogin)/beforeLogin.css";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";

import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default function ImagePreviewer() {
	const [src, setSrc] = useState("");
	const [preview, setPreview] = useState("");
	const [cropper, setCropper] = useState<Cropper | null>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const onChangeImage: ChangeEventHandler<HTMLInputElement> = (event) => {
		// const fileList = event.target.files;
		// if (fileList && fileList?.length !== 0) {
		// 	const filesArray = Array.from(fileList);
		// 	for (const file of filesArray) {
		// 		const url = URL.createObjectURL(file);
		// 		setSrc(url);
		// 		initCropper(url);
		// 	}
		// }
		if (event.target.files) {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (event) => {
					if (event.target && event.target.result) {
						const url = event.target.result;
						setSrc(url as string);
					}
				};
				reader.readAsDataURL(file);
			}
		}
	};

	useEffect(() => {
		if (src) {
			if (cropper) cropper.destroy();
			const cropperInstance = new Cropper(imgRef.current as HTMLImageElement, {
				aspectRatio: 1, // Adjust the aspect ratio as needed
				viewMode: 1, // Set the view mode
				guides: true, // Show guides for cropping
				autoCropArea: 1, // Auto crop the entire image
				responsive: true, // Enable responsive layout
				// crop(event) {
				// 	console.log(event.detail.x);
				// 	console.log(event.detail.y);
				// 	console.log(event.detail.width);
				// 	console.log(event.detail.height);
				// 	console.log(event.detail.rotate);
				// 	console.log(event.detail.scaleX);
				// 	console.log(event.detail.scaleY);
				// },
			});

			setCropper(cropperInstance);
		}
	}, [src]);

	const onClickCrop = () => {
		console.log("cropped", cropper);
		if (!!cropper) {
			const cropped = cropper.getCroppedCanvas();
			console.log("cropped", cropped);
			if (cropped) {
				if (cropped.width > 100 || cropped.height > 100) {
					alert("to big image!(limit: 100 x 100)");
				}
				const croppedData = cropped.toDataURL();
				console.log("croppedData", croppedData);
				setPreview(croppedData);
				// if (inputRef.current) {
				// 	inputRef.current.value = croppedData;
				// }
			}
		}
	};
	const onClickCancel = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		setSrc("");
		setPreview("");
		if (cropper) cropper.destroy();
		setCropper(null);
	};

	return (
		<>
			<div className={styles.formInputWrapper}>
				<label htmlFor="avatar">IMAGE</label>

				<div className={styles.cropperContainer}>
					<div className={styles.cropTargetContainer}>
						<img src={src} ref={imgRef} style={{ display: "block", maxWidth: "100%" }} />
					</div>
					<div className={styles.smallButtonsContainer}>
						<button type="button" onClick={onClickCrop} className={styles.smallButton}>
							Crop
						</button>
						<button type="button" onClick={onClickCancel} className={styles.smallButton}>
							Cancel
						</button>
					</div>
				</div>
				<div className={styles.inputContainer}>
					<input id="avatar" ref={inputRef} className={styles.fileUploadInput} name="avatar" type="file" accept="image/*" required onChange={onChangeImage} />
					<div className={styles.previewContainer} style={{ backgroundImage: `url(${preview})` }}></div>
				</div>
			</div>
		</>
	);
}
