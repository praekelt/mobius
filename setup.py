from setuptools import setup, find_packages


setup(
    name="mobius",
    version="0.1",
    description="Mobius is a platform that ties together Jmbo and Mote.",
    #long_description = open("README.rst", "r").read() + open("AUTHORS.rst", "r").read() + open("CHANGELOG.rst", "r").read(),
    author="Praekelt Consulting",
    author_email="dev@praekelt.com",
    license="BSD",
    url="http://www.mobius.org",
    packages = find_packages(),
    install_requires = [
        # Redundant. Pip handles this now.
    ],
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python",
        "License :: OSI Approved :: BSD License",
        "Development Status :: 5 - Production/Stable",
        "Operating System :: OS Independent",
        "Framework :: Django",
        "Intended Audience :: Developers",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
    ],
    zip_safe=False,
)
