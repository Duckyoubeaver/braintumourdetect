'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import s from '../Documentation.module.css'; // Import the CSS module

type SectionKey =
  | 'introduction'
  | 'getting-started'
  | 'video-tutorial'
  | 'faq'
  | 'contact';

const sections: Record<SectionKey, { title: string; content: string }> = {
  introduction: {
    title: 'Introduction',
    content: `Welcome to the Neurovision documentation! <br><br>Here, you'll find comprehensive guides and detailed information on our AI-powered brain tumor classification system. Using advanced machine learning models, Neurovision accurately identifies and categorises various types of brain tumors, enhancing diagnostic precision and treatment planning. You can navigate through the sidebars for specific sections, including getting started, features, video demos, and FAQ pages.
    <br><br>

    <img src="/element.png" alt="Navigation Menu">
`
  },
  'getting-started': {
    title: 'Getting Started',
    content: `To get started with NeuroVision, let's get familiar with the navigation menu. You can use the navigation menu to move around the application. Simply click on the tab that you want to access its features. 
<br><br>
<img src="/1.png" alt="Navigation Menu">
1) The patients tab is the main workspace for radiologists. Here you can have a high level overview of all of your patients through folders. If you don’t have patient folders already, your first step is to click on the blue button and create your first patient folder. 
<br><br>
<img src="/3.png" alt="Navigation Menu">
<br><br>
2) You will see a popup with a textbox and two buttons. Type out the desired patient name in the textbox and when you are ready, click the add patient button. If you did not want to perform this action, you can click on the cancel button to go back to the patients tab. 
<br><br>
<img src="/screenshot.png" alt="Navigation Menu">
3) The page will automatically reload and you will be able to see the patient that you just added. Click on the patient card to start uploading scans. 
<br><br>
<img src="/2.png" alt="Navigation Menu">
4) The upload patient component will take JPEG images. Drag and drop your brain scans or click on the component to choose the file to upload. 
<br><br>
<img src="/5.png" alt="Navigation Menu">
5) If the file upload is successful, you should see the scan under the upload box. Click on the scan button to analyse the brain scan. 
<br><br>
<img src="/6.png" alt="Navigation Menu">
6) After loading the image, you should see the results in a few seconds. It displays if the brain tumour is likely a tumour, what type of tumour and a probability bar chart. 
<br><br>
<img src="/7.png" alt="Navigation Menu">
Thank you for taking the time to explore our documentation. We hope it has been helpful in getting you up and running with NeuroVision.


    `
  },
  'video-tutorial': {
    title: 'Video Tutorial',
    content: `
    <video width="100%" controls>
  <source src="/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
    `
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: `
1) What format must the images be? - All images must be in a JPG format, the results will also be more accurate if the image is a higher quality.
<br><br>
2) How can I make my images compatible? - Check to see if the file ends in “JPG” or “JPEG” if it does not use an online converter to change the files format to a JPG.
<br><br>
3) Can I restore diagnostics? - Unfortunately we do not store the data once it has been deleted so if it has been deleted it is gone.
<br><br>
4) Do any purchases need to be made to use Neurovision? - No! All of Neurovision’s tools are completely free of use.
<br><br>
5) Where are we located? - We are an Australian team but want to assist in the detection of brain tumours globally.
<br><br>
6) Do you accept donations? - We do not accept any donations but any support that you can contribute to the brain tumour field would be greatly appreciated, here are some foundations which could use the support:
<br><br>

<a href="https://braintumourresearch.org/" class="${s.blueLink}" target="_blank" rel="noopener noreferrer">Brain Tumour Research</a>


<br><br>
<a href="https://www.curebraincancer.org.au/" class="${s.blueLink}" target="_blank" rel="noopener noreferrer">Cure Brain Cancer</a>


<br><br>
<a href="https://www.thebraintumourcharity.org/ " class="${s.blueLink}" target="_blank" rel="noopener noreferrer">Brain Tumour Charity</a>


<br><br>
FAQs haven't answered your problems? Contact us via our information on the contacts page for personalised support.`
  },
  contact: {
    title: 'Contact',
    content: `
  <div class="${s.contactForm}">

        <form>
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            placeholder="Dr Frew" 
            class="${s.inputField}" 
            required 
          />
          <span class="${s.error}" id="firstNameError"></span>
          <br><br>
          
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            class="${s.inputField}" 
            placeholder="Your message here..." 
            required
          ></textarea>
          <br><br>
          
          <label htmlFor="dropdown">Select a priority level:</label>
          <select 
            id="dropdown" 
            name="dropdown" 
            class="${s.inputField}"
          >
            <option value="option1">Critical</option>
            <option value="option2">Standard Priority</option>
            <option value="option3">Non-Essential</option>
          </select>
          <br><br>
          
          <label>
            <input 
              type="checkbox" 
              id="subscribe" 
              name="subscribe" 
              class="${s.checkbox}"
            />
            Follow up with email
          </label>
          <br><br>
          
          <button type="submit" class="${s.submitButton}">Submit</button>
        </form>
      </div>
    `
  }
};

const SectionPage: React.FC = () => {
  const params = useParams();
  const section = params.section as SectionKey;
  const sectionData = sections[section];

  if (!sectionData) {
    return <p>Section not found</p>;
  }

  return (
    <div className={s.contentSection}>
      <h1>{sectionData.title}</h1>
      {/* Use dangerouslySetInnerHTML to render HTML content */}
      <div dangerouslySetInnerHTML={{ __html: sectionData.content }} />
    </div>
  );
};

export default SectionPage;
