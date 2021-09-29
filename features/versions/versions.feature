@versions @extendedTest

Feature: I want to be able to see the version of the deployed Schul-Cloud

	@nuxtversion
	Scenario:
		When user arrives on the nuxt version page
		Then he should see the git sha

# Currently only the client works,
# because the other ones need a special build step that is not in the Dockerfiles yet

# @clientversion
# Scenario:
#   When user arrives on the client version page
#   Then he should see the git sha

# @serverversion
# Scenario:
#   When user arrives on the server version page
#   Then he should see the git sha
