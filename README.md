notes demo
----------

-Since I had no communication channel, I made some educated guesses, when spec was not 100% clear, or it was needed to demo something.
For contract jobs, everything is always asked from the client first

-Status for new items is always "New" irl, but for demo purposes, I added a random status, so counter can be evaluated

-There is no possibility to change status as this was not required

-For a new item either title OR content is required as defined in the specification, was it supposed to be AND?

-Multiple news items selection prevented (this was not clear in the specification, speaking about only one row delete)

-Also the toggle all checkboxes disabled and added click through on it for the above reason

-Added sorting up arrow as bonus

-Tests are run by karma/jasmine in headless chrome. The packages are not the latests, I just quicly copypasted them from another project

-Tests have some overlap in the view/ctrl part of notes component to showcase both styles of testing.

-No end-to-end tests for the demo

