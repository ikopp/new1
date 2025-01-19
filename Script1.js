// svg home
        
        const homeButton = document.querySelector('.home-button');
        
        homeButton.addEventListener('mouseenter', () => {
            homeButton.style.animation = 'pulse 1s infinite';
        });

        homeButton.addEventListener('mouseleave', () => {
            homeButton.style.animation = 'none';
            void homeButton.offsetWidth;
        });

        homeButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            
            // إضافة توجيه بعد انتهاء التأثير البصري
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                window.location.href = './index.html';
            }, 100);
        });
        
        // End svg home
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const arabic = 'طعمانصلكهيسرحق';
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = arabic.charAt(Math.floor(Math.random() * arabic.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        setInterval(draw, 30);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        // furquan el hoda content javasript
        
        const highlightChars = {
            'ا': '1', 'أ': '1', 'إ': '1', 'ئ': '1','ؤ': '1', 'ء': '1', 'ى': '1', 'آ': '1',
            'ل': '1',
            'م': '1',
            'ر': '1'
        };
        const highlightChars1 = ['ا', 'أ', 'إ', 'ئ','ؤ', 'ء', 'ى', 'آ', 'ل', 'م', 'ر'];
        function highlightText(text) {
            return text.split('').map(char => {
                if (char in highlightChars) {
                    const number = highlightChars[char];
                    const numberClass = parseInt(number) > 9 ? 'number large-number' : 'number';
                    return `<span class="highlight">${char}<span class="${numberClass}">${number}</span></span>`;
                  
                }
                return char;
            }).join('');
        }

        // script placeholder
        
        const runInput = document.querySelector('#inputText');
        const line = '   أدخل النص القرآني هنا ......';
        const speed = 100;
        let i = 0;
        let done;

        function run_line() {
            if (i++ < line.length) {
                runInput.value = line.substring(0, i);
            } else {
                runInput.value = " ";
                i = 0;
            }
            done = setTimeout(run_line, speed);
        }
        run_line();

        const inputText = document.getElementById('inputText');
        const customAttr = inputText.getAttribute('placeholder');

        inputText.addEventListener('focus', function () {
            clearTimeout(done);
            this.value = '';
            if (this.hasAttribute('placeholder')) {
                this.removeAttribute('placeholder');
            }
        });

        inputText.addEventListener('blur', function () {
            this.setAttribute('placeholder', customAttr);
        });

        //end script place holder
        
        function highlightText1(text) {
            return text.split('').map(char => 
                highlightChars1.includes(char) ? `<span class="highlight">${char}</span>` : char
            ).join('');
        }






        

        function analyzeText() {
            const inputText = document.getElementById('inputText').value;
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = `<p><span style="font-size:24px; background-color:#f1c40f; color:#2c3e50">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ألمر&nbsp; &nbsp; &nbsp;&nbsp;</span></p>`;

            const lines = inputText.split('\n');
            let totalAnalysis = '';
            
            lines.forEach((line, index) => {
                if (line.trim() !== '') {
                    outputDiv.innerHTML += `<div class="input-line">القرآن: ${highlightText1(line)}</div>`;

                    outputDiv.innerHTML += `<div class="input-line">القرآن: ${highlightText(line)}</div>`;
                    const lineAnalysis = analyzeLine(line);
                    outputDiv.innerHTML += `<div class="output-line">فرقان: ${lineAnalysis}</div>`;
                    totalAnalysis += lineAnalysis + ' ';
                }
            });

            const wordCount = countWords(inputText);
            const allCharCount = countAllChars(inputText);
            const specificCharCounts = countSpecificChars(inputText);

            outputDiv.innerHTML += `<div class="counters">
           <table id="table-7">
        <thead>
            <tr>
                <th colspan="2">فرقان الهدى عروج فكري</th>
            </tr>
            <tr>
                <th colspan="2">إحصائيات النص القرآني كاملا</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th id="tasnimsaid">${wordCount}</th>
                <th>عدد الكلمات</th>
            </tr>
            <tr>
                <th id="tasnimsaid1">${allCharCount}</th>
                <th>عدد جميع الحروف</th>
            </tr>
            <tr>
                <th id="tasnimsaid2">${specificCharCounts.total}</th>
                <th>عدد الحروف (أ، ل ، م ، ر )</th>
            </tr>
            <tr>
                <th id="tasnimsaid3">${specificCharCounts.alif}</th>
                <th>عدد حرف (أ)</th>
            </tr>
            <tr>
                <th id="tasnimsaid4">${specificCharCounts.lam}</th>
                <th>عدد حرف (ل)</th>
            </tr>
            <tr>
                <th id="tasnimsaid5">${specificCharCounts.meem}</th>
                <th>عدد حرف (م)</th>
            </tr>
            <tr>
                <th id="tasnimsaid6">${specificCharCounts.raa}</th>
                <th>عدد حرف (ر)</th>
            </tr>
        </tbody>
    </table>

            </div>`;
        }

    //     outputDiv.innerHTML +=`<div class="counters">
    // <table id="table-7">
    //     <thead>
    //         <tr>
    //             <th colspan="2">فرقان الهدى عروج فكري</th>
    //         </tr>
    //         <tr>
    //             <th colspan="2">إحصائيات النص القرآني كاملا</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         <tr>
    //             <th id="tasnimsaid">${wordCount}</th>
    //             <th>عدد الكلمات</th>
    //         </tr>
    //         <tr>
    //             <th id="tasnimsaid1">${allCharCount}</th>
    //             <th>عدد جميع الحروف</th>
    //         </tr>
    //         <tr>
    //             <th id="tasnimsaid2">${specificCharCounts.total}</th>
    //             <th>عدد الحروف (أ، ل ، م ، ر )</th>
    //         </tr>
    //         <tr>
    //             <th id="tasnimsaid3">${specificCharCounts.alif}</th>
    //             <th>عدد حرف (أ)</th>
    //         </tr>
    //         <tr>
    //             <th id="tasnimsaid4">${specificCharCounts.lam}</th>
    //             <th>عدد حرف (ل)</th>
    //         </tr>
    //         <tr>
    //             <th id="tasnimsaid5">${specificCharCounts.meem}</th>
    //             <th>عدد حرف (م)</th>
    //         </tr>
    //         <tr>
    //             <th id="tasnimsaid6">${specificCharCounts.raa}</th>
    //             <th>عدد حرف (ر)</th>
    //         </tr>
    //     </tbody>
    // </table>
    // </div>`                                                                                                                                                        

        function analyzeLine(line) {
            const words = line.split(' ');
            return words.map(analyzeWord).join('<span class="comma"> </span>');
        }

        function analyzeWord(word) {
            let result = '';
            for (let char of word) {
                if (['ا', 'ى', 'ء', 'ئ', 'ؤ', 'أ', 'إ', 'آ'].includes(char)) {
                    result += 'ألف ';
                } else if (char === 'ل') {
                    result += 'لام ';
                } else if (char === 'م') {
                    result += 'ميم ';
                } else if (char === 'ر') {
                    result += 'راء ';
                }
            }
            return result.trim();
        }

        function countWords(text) {
            return text.trim().split(/\s+/).length;
        }

        function countAllChars(text) {
            return text.replace(/\s/g, '').length;
        }

        function countSpecificChars(text) {
            const counts = {
                alif: 0,
                lam: 0,
                meem: 0,
                raa: 0,
                total: 0
            };

            for (let char of text) {
                if (['ا', 'ى', 'ء', 'ئ', 'ؤ', 'أ', 'إ', 'آ'].includes(char)) {
                    counts.alif++;
                    counts.total++;
                } else if (char === 'ل') {
                    counts.lam++;
                    counts.total++;
                } else if (char === 'م') {
                    counts.meem++;
                    counts.total++;
                } else if (char === 'ر') {
                    counts.raa++;
                    counts.total++;
                }
            }

            return counts;
        }

        function printResult() {
            const printContents = document.getElementById('output').innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const audioFolderPath = "audio/"; // Change to your desired folder path
const wordToAudioMap = {
    "ألف": `${audioFolderPath}alif.mp3`,
    "حاء": `${audioFolderPath}hha.mp3`,
    "راء": `${audioFolderPath}ra.mp3`,
    "سين": `${audioFolderPath}sin.mp3`,
    "صاد": `${audioFolderPath}sad.mp3`,
    "طاء": `${audioFolderPath}ta.mp3`,
    "عين": `${audioFolderPath}ain.mp3`,
    "قاف": `${audioFolderPath}qaf.mp3`,
    "كاف": `${audioFolderPath}kaf.mp3`,
    "لام": `${audioFolderPath}lam.mp3`,
    "ميم": `${audioFolderPath}mim.mp3`,
    "نون": `${audioFolderPath}nun.mp3`,
    "هاء": `${audioFolderPath}ha.mp3`,
    "ياء": `${audioFolderPath}ya.mp3`  
};

const preloadedAudioBuffers = {};

// Function to load and decode an audio file
const loadAudioFile = async (url) => {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    return audioContext.decodeAudioData(data);
};

// Preload all audio files
const preloadAudioFiles = async () => {
    for (const [word, filePath] of Object.entries(wordToAudioMap)) {
        try {
            const buffer = await loadAudioFile(filePath);
            preloadedAudioBuffers[word.toLowerCase()] = buffer;
        } catch (error) {
            console.error(`Error loading file for "${word}":`, error);
        }
    }
};

// Merge smaller chunks of audio buffers
const mergeAudioBuffersInChunks = (buffers, maxChunkLength = 300) => {
    const sampleRate = audioContext.sampleRate;
    const chunks = [];
    let currentChunkBuffers = [];
    let currentChunkLength = 0;

    // Group buffers into chunks
    buffers.forEach((buffer) => {
        if (currentChunkLength + buffer.duration <= maxChunkLength) {
            currentChunkBuffers.push(buffer);
            currentChunkLength += buffer.duration;
        } else {
            chunks.push(currentChunkBuffers);
            currentChunkBuffers = [buffer];
            currentChunkLength = buffer.duration;
        }
    });

    if (currentChunkBuffers.length > 0) {
        chunks.push(currentChunkBuffers);
    }

    // Merge each chunk and store in a list
    const mergedChunks = chunks.map((chunkBuffers) => {
        const totalLength = chunkBuffers.reduce((sum, buffer) => sum + buffer.length, 0);
        const mergedBuffer = audioContext.createBuffer(1, totalLength, sampleRate);

        let offset = 0;
        chunkBuffers.forEach((buffer) => {
            mergedBuffer.copyToChannel(buffer.getChannelData(0), 0, offset);
            offset += buffer.length;
        });

        return mergedBuffer;
    });

    return mergedChunks;
};

// Convert AudioBuffer to WAV Blob
const audioBufferToWavBlob = (buffer) => {
    const offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    source.connect(offlineContext.destination);
    source.start();

    return offlineContext.startRendering().then((renderedBuffer) => {
        const wavData = audioBufferToWav(renderedBuffer);
        return new Blob([wavData], { type: "audio/wav" });
    });
};

// Save Blob to local file
const saveBlobToFile = async (blob, filename) => {
    const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
            {
                description: "Audio Files",
                accept: { "audio/wav": [".wav"] }
            }
        ]
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
};

// Main function for generating and saving audio
document.getElementById("generateButton").addEventListener("click", async () => {
    const textInput = document.getElementById("textInput").value;
    const words = textInput.split(" ");

    // Preload audio files if not already done
    if (Object.keys(preloadedAudioBuffers).length === 0) {
        await preloadAudioFiles();
    }

    const buffers = words
        .map((word) => preloadedAudioBuffers[word.toLowerCase()])
        .filter(Boolean);

    if (buffers.length === 0) {
        alert("No audio files found for the input text.");
        return;
    }

    // Merge buffers in smaller chunks
    const mergedChunks = mergeAudioBuffersInChunks(buffers, 300); // Maximum 5 seconds per chunk

    // Convert each chunk to a Blob and save
    for (let i = 0; i < mergedChunks.length; i++) {
        const chunkBlob = await audioBufferToWavBlob(mergedChunks[i]);
        await saveBlobToFile(chunkBlob, `output_chunk_${i + 1}.wav`);
    }

    alert("Audio saved in chunks successfully!");
});
// Preload audio files on page load
preloadAudioFiles();
