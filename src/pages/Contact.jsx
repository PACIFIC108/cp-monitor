import React from 'react'

function Contact() {
	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-orange-300">
			<div className="w-96 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-xl border border-gray-300 text-white">
				<ul className="space-y-4">
					{/* Instagram Link */}
					<li className="bg-gray-800 text-white text-center flex items-center justify-center p-4 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105">
						<a href="https://www.instagram.com/prasantkayshep__/profilecard/?igsh=OXo1MXFvMDI3NXhi" 
						   target="_blank" rel="noopener noreferrer">
							<i className="fab fa-instagram mr-2"></i> Instagram
						</a>
					</li>
					
					{/* Phone Link */}
					<li className="bg-gray-800 text-white text-center flex items-center justify-center p-4 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105">
						<a href="tel:+916201663796">
							<i className="fas fa-phone mr-2"></i> Call Us
						</a>
					</li>

					<li className="bg-gray-800 text-white text-center flex items-center justify-center p-4 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105">
						<a href="https://wa.me/+916201663796" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-whatsapp mr-2"></i> Message Us
						</a>
					</li>

					<li className="bg-gray-800 text-white text-center flex items-center justify-center p-4 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105">
						<a href="mailto:pkkr.pacific@gmail.com">
							<i className="fas fa-envelope mr-2"></i> Mail Us
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Contact;
